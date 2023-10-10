import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Form, Button, Image } from 'react-bootstrap';
import Header from '../../components/Header';
import BottomContainer from '../../components/BottomContainer';
import Button1 from '../../components/Button1';
import AddPetForm from '../../components/AddPetForm';

import { MainContext, MainProvider } from '../../contexts/Main';
import MainContainer from '../../components/MainContainer';
import { BsFillCameraFill, BsFillTrashFill } from 'react-icons/bs';
// import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { api } from '../../services/api';

const AddPet: React.FC = () => {
  // const {
  //   userInfo
  // } = useContext(MainContext);

  // const [imageInput, setImageInput] = useState(null);
  // const [imageURL, setImageURL] = useState<string>(null);

  // const [name, setName] = useState('');
  // const [species, setSpecies] = useState<'Cachorro' | 'Gato'>('Cachorro');
  // const [breed, setBreed] = useState('');
  // const [birthDate, setBirthDate] = useState('');
  // const [adoptionDate, setAdoptionDate] = useState('');
  // const [weight, setWeight] = useState('');

  // function onImageChange(e) {
  //   setImageInput(e.target.files[0]);
  // }

  // function clearImage() {
  //   setImageInput(null);
  //   setImageURL(null);
  // }

  // function createPet({ data }: any) {
  //   console.log(userInfo)
  //   async function _call() {
  //     const url = `create_pet/`;
  //     await api
  //       .post(
  //         url,
  //         data,
  //         {
  //           headers: {
  //             'Content-type': 'application/json',
  //             Authorization: `Bearer ${userInfo.access}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response.data)
  //         // setEventList(response.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   _call();
  // }

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const body = {
  //     name: name,
  //     species: species,
  //     birth_date: birthDate,
  //     adoption_date: adoptionDate,
  //     weight: weight,
  //     picture: imageInput,
  //   };
  //   console.log(body);
  //   createPet(body)
  // };

  // useEffect(() => {
  //   const blob = new Blob([imageInput], { type: 'image/png' });
  //   const img = URL.createObjectURL(blob);
  //   setImageURL(img);
  // }, [imageInput]);

  return (
    <MainProvider>
      <MainContainer>
        <Header />
        <h2>Novo pet:</h2>
        <BottomContainer>
          <AddPetForm />
        </BottomContainer>
      </MainContainer>
    </MainProvider>
  );
};

export default AddPet;
