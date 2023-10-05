import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { Row, Col, Form, Button, Image } from 'react-bootstrap';
import Header from '../../components/Header';
import BottomContainer from '../../components/BottomContainer';
import Button1 from '../../components/Button1';

import { MainContext, MainProvider } from '../../contexts/Main';
import MainContainer from '../../components/MainContainer';
import { BsFillCameraFill, BsFillTrashFill } from 'react-icons/bs';
// import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { api } from '../../services/api';

const AddPet: React.FC = () => {
  const {
    userInfo
  } = useContext(MainContext);

  const [imageInput, setImageInput] = useState(null);
  const [imageURL, setImageURL] = useState<string>(null);

  const [name, setName] = useState('');
  const [species, setSpecies] = useState<'Cachorro' | 'Gato'>('Cachorro');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [adoptionDate, setAdoptionDate] = useState('');
  const [weight, setWeight] = useState('');

  function onImageChange(e) {
    setImageInput(e.target.files[0]);
  }

  function clearImage() {
    setImageInput(null);
    setImageURL(null);
  }

  function createPet({ data }: any) {
    console.log(userInfo)
    async function _call() {
      const url = `create_pet/`;
      await api
        .post(
          url,
          data,
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.access}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data)
          // setEventList(response.data);
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      name: name,
      species: species,
      birth_date: birthDate,
      adoption_date: adoptionDate,
      weight: weight,
      picture: imageInput,
    };
    console.log(body);
    createPet(body)
  };

  useEffect(() => {
    const blob = new Blob([imageInput], { type: 'image/png' });
    const img = URL.createObjectURL(blob);
    setImageURL(img);
  }, [imageInput]);

  return (
    <MainProvider>
      <MainContainer>
        <Header />
        <h2>Novo pet:</h2>
        <BottomContainer>
          <Form onSubmit={submitHandler}>
            <Row className={styles.formRow}>
              <Col>
              <div key='default-radio' className="mb-3">
                <Form.Check // prettier-ignore
                  inline
                  // disabled={species == 'Gato'}
                  defaultChecked
                  type='radio'
                  name="group1"
                  id='default-radio'
                  label='Cachorro'
                  onChange={(e) => setSpecies('Cachorro')}
                />
                <Form.Check
                  inline
                  // disabled={species == 'Cachorro'}
                  type='radio'
                  name="group1"
                  label='Gato'
                  id='disabled-default-radio'
                  onChange={(e) => setSpecies('Gato')}
                />
              </div>
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlInput1'
                >
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    placeholder='Sherlock'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlInput1'
                >
                  <Form.Label>Raça</Form.Label>
                  <Form.Control
                    placeholder='SRD'
                    type='text'
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Data de nascimento</Form.Label>
                  <Form.Control
                    placeholder='17/09/2021'
                    type='date'
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Data de adoção</Form.Label>
                  <Form.Control
                    placeholder='17/09/2021'
                    type='date'
                    value={adoptionDate}
                    onChange={(e) => setAdoptionDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Peso atual (kg)</Form.Label>
                  <Form.Control
                    placeholder='5.3'
                    type='number'
                    step='.01'
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col >
                <Form.Group controlId='formFile' className='mb-3'>
                  <div className={styles.photoBox}>
                    {imageInput ? (
                      <>
                        <Image
                          src={imageURL}
                          alt=''
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 'inherit',
                          }}
                        />
                        <BsFillTrashFill
                          size={100}
                          className={styles.photoTrashIcon}
                          onClick={clearImage}
                        />
                      </>
                    ) : (
                      <BsFillCameraFill size={100} />
                    )}
                  </div>
                  <Form.Control
                    type='file'
                    accept='image/*'
                    onChange={onImageChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className={styles.formRow}>
              <Button1 type='submit'>Adicionar pet</Button1>
            </Row>
          </Form>
        </BottomContainer>
      </MainContainer>
    </MainProvider>
  );
};

export default AddPet;
