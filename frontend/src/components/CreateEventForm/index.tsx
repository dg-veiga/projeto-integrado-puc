import React, { useContext, useEffect, useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { MainContext, MainProvider } from '../../contexts/Main';
import { api, endpoints } from '../../services/api';
import styles from './styles.module.css';
import Button1 from '../Button1';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useRouter } from 'next/router';
import PetPictureContainerHeader from '../PetPictureContainerHeader';

export default function CreateEventForm({ id, oldEventId = null }) {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(1);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  const { userInfo } = useContext(MainContext);

  function createEvent(data: FormData) {
    const headers = {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${userInfo.access}`,
    };
    async function _callPost() {
      const url = endpoints.event;
      await api
        .post(url, data, {
          headers: headers,
        })
        .then((response) => {
          router.push(`/pet/${id}/eventos`);
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log(err.response.data);
          }
          setErrorMessage(err);
        });
    }
    async function _callPut() {
      const url = `event/${oldEventId}/`;
      await api
        .put(url, data, {
          headers: headers,
        })
        .then((response) => {
          router.push(`/pet/${id}/eventos`);
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log(err.response.data);
          }
          setErrorMessage(err);
        });
    }
    if (oldEventId) {
      _callPut();
    } else {
      _callPost();
    }
  }

  function getEventForEdition(id) {
    async function _call() {
      const url = `event/${id}/`;
      await api
        .get(url, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCategory(response.data.category);
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  function deleteEvent() {
    async function _call() {
      const url = `event/${id}/`;
      await api
        .delete(url, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          router.push(`/pet/${id}/eventos`)
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  const WarningToast = ({ message }) => {
    return (
      <>
        <ToastContainer
          className='p-3'
          position={'middle-end'}
          style={{ zIndex: 1 }}
        >
          <Toast
            bg={'danger'}
            onClose={() => setErrorMessage(null)}
            show={errorMessage != ''}
            delay={10000}
            autohide
          >
            <Toast.Header closeButton={true}>
              <strong className='me-auto'>Erro:</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pet', id);
    formData.append('title', title);
    formData.append('category', String(category));
    formData.append('description', description);
    formData.append('event_date', eventDate);
    formData.append('event_time', eventTime);
    createEvent(formData);
  };

  const handleEventDelete = () => {
    deleteEvent();
  };

  useEffect(() => {
    if (oldEventId) {
      getEventForEdition(oldEventId);
    }
  }, []);

  return (
    <>
      <PetPictureContainerHeader petId={id}/>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>Título</Form.Label>
          <Form.Control
            placeholder=''
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Categoria</Form.Label>
          <Form.Select onChange={(e) => setCategory(e.target.value as any)}>
            <option value={1}>Regular</option>
            <option value={2}>Saúde</option>
            <option value={3}>Consulta veterinária</option>
            <option value={4}>Vacina</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder=''
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Data</Form.Label>
              <Form.Control
                type='date'
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type='time'
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className={styles.formRow}>
          {oldEventId ? (
            <>
              <Button1 type='submit'>Editar evento</Button1>
              <Button type='button' onClick={handleEventDelete} >Deletar evento</Button>
            </>
          ) : (
            <Button1 type='submit'>Adicionar evento</Button1>
          )}
        </Row>
      </Form>
      {errorMessage ? WarningToast(errorMessage) : <></>}
    </>
  );
}
