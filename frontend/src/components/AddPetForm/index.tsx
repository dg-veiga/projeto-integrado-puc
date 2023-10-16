import React, { useEffect, useState, useContext } from 'react';
import styles from './styles.module.css';
import { Row, Col, Form, Image, Button } from 'react-bootstrap';
import Button1 from '../../components/Button1';

import { MainContext } from '../../contexts/Main';
import { BsFillCameraFill, BsFillTrashFill } from 'react-icons/bs';
import { api, endpoints } from '../../services/api';
import { useRouter } from 'next/router';

export default function AddPetForm() {
  const { userInfo } = useContext(MainContext);
  const router = useRouter();

  const [imageInput, setImageInput] = useState(null);
  const [imageURL, setImageURL] = useState<string>(null);

  const [name, setName] = useState('');
  const [species, setSpecies] = useState<1 | 2>(1);
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

  function createPet(data: FormData) {
    async function _call() {
      const url = endpoints.createPet;
      await api
        .post(url, data, {
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          router.push('/home')
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('species', String(species));
    formData.append('birth_date', birthDate);
    formData.append('adoption_date', adoptionDate);
    formData.append('weight', weight);
    formData.append('picture', imageInput);
    createPet(formData);
  };

  useEffect(() => {
    const blob = new Blob([imageInput], { type: 'image/png' });
    const img = URL.createObjectURL(blob);
    setImageURL(img);
  }, [imageInput]);

  return (
    <Form onSubmit={submitHandler}>
      <Row className={styles.formRow}>
        <Col>
          <div key='default-radio' className='mb-3'>
            <Form.Check // prettier-ignore
              inline
              defaultChecked
              type='radio'
              name='group1'
              id='default-radio'
              label='Cachorro'
              onChange={(e) => setSpecies(1)}
            />
            <Form.Check
              inline
              type='radio'
              name='group1'
              label='Gato'
              id='disabled-default-radio'
              onChange={(e) => setSpecies(2)}
            />
          </div>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              placeholder=''
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
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
              placeholder='0.0'
              type='number'
              step='.01'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
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
                </>
              ) : (
                <BsFillCameraFill size={100} />
              )}
            </div>
            <Row style={{marginTop: '1rem'}}>
              <Col md={imageInput ? 10:12}>
                <Form.Control
                  type='file'
                  accept='image/*'
                  onChange={onImageChange}
                />
              </Col>
              {imageInput ? (
                <Col md={2}>
                  <Button onClick={clearImage}>
                    <BsFillTrashFill
                      size={20}
                      className={styles.photoTrashIcon}
                    />
                  </Button>
                </Col>
              ) : (
                <></>
              )}
            </Row>
          </Form.Group>
        </Col>
      </Row>
      <Row className={styles.formRow}>
        <Button1 type='submit'>Adicionar pet</Button1>
      </Row>
    </Form>
  );
}
