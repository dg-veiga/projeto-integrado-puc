import Link from 'next/link';
import React, { useContext, useEffect, useState, ReactNode } from 'react';
// import styles from './styles.module.scss';
import { Card, Row, Col } from 'react-bootstrap';
import { MainContext, MainProvider } from '../../contexts/Main';
import BottomContainer from '../../components/BottomContainer';
import { api } from '../../services/api';
import PetCard from '../PetCard';

export default function PetList() {
  const [petList, setPetList] = useState([]);
  const [sharedPetList, setSharedPetList] = useState([]);

  const { userInfo, getSharedPetsIds, amIOwner } = useContext(MainContext);

  function getPetList() {
    async function _call() {
      const url = `pet/`;
      await api
        .get(url, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          setPetList(response.data);
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  function getSharedPetList() {
    async function _call() {
      const url = `shared_pet/`;
      await api
        .get(url, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          setSharedPetList(response.data);
          localStorage.setItem(
            'sharedPetsIds', 
            JSON.stringify(response.data.map(obj => obj.id))
          );
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  useEffect(() => {
    getPetList();
    getSharedPetList();
  }, []);

  const renderPets = (list) =>
    list.map((pet, index) => (
      <PetCard
        id={pet.id}
        name={pet.name}
        birthDate={pet.birth_date}
        adoptionDate={pet.adoption_date}
        petPicture={pet.picture}
        eventNum={pet.event_num}
        owner={amIOwner(pet.id)}
      />
    ));

  return (
    <>
      <BottomContainer>{petList ? renderPets(petList) : <></>}</BottomContainer>
      {sharedPetList.length > 0 ? (
        <>
          <h2>Pets compartilhados comigo:</h2>
          <BottomContainer>{renderPets(sharedPetList)}</BottomContainer>{' '}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
