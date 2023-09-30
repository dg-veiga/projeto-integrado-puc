import Link from 'next/link';
import React, { useContext, useEffect, useState, ReactNode } from 'react';
// import styles from './styles.module.scss';
import { Card, Row, Col } from 'react-bootstrap'
import {MainContext, MainProvider} from '../../contexts/Main'
import { api,  } from '../../services/api';
import PetCard from '../PetCard';

export default function PetList() {

  const [petList, setPetList] = useState([])

  const {
    userInfo,
  } = useContext(MainContext);

  function getPetList() {
    async function _call() {
      const url = `pet/`;
      await api
        .get(
          url,
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.access}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data)
          setPetList(response.data);
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  useEffect(() => {
    getPetList()
  }, [])

  const pets = petList.map((pet, index) => 
    <PetCard id={pet.id} name={pet.name} birthDate={pet.birth_date} adoptionDate={pet.adoption_date}/>);

  return (
    <>
      {petList? pets : <></>}
    </>
  );
}
