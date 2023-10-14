import React, { useContext, useEffect, useState, ReactNode } from 'react';
import { Card, Row, Col, Badge, Form, Button } from 'react-bootstrap';
import { MainContext, MainProvider } from '../../contexts/Main';
import { api } from '../../services/api';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import { FaPaw } from 'react-icons/fa';

export default function ViewersList({ petId, viewersList }) {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const { userInfo } = useContext(MainContext);

  function setNewViewer(data: FormData) {
    async function _call() {
      console.log(data);
      const url = `viewer/`;
      await api
        .post(url, data, {
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          router.reload();
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  function removeViewer(email) {
    async function _call() {
      const url = `viewer/`;
      const data = {
        email: email,
        pet_id: petId,
      };
      console.log(data);
      await api
        .patch(url, data, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          router.reload();
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('pet_id', petId);
    setNewViewer(formData);
  };

  const mappedViewers = () =>
    viewersList.map((viewer, index) => (
      <tr>
        <td>{viewer.first_name}</td>
        <td>{viewer.email}</td>
        <td>
          <a href='#' onClick={() => removeViewer(viewer.email)}>
            <FaPaw size={20} />
          </a>
        </td>
      </tr>
    ));

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {viewersList ? (
            mappedViewers()
          ) : (
            <tr>
              <td>---</td>
              <td>---</td>
              <td>---</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Row>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={8}>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>Email do amigo interessado:</Form.Label>
                <Form.Control
                  placeholder=''
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} style={{ alignItems: 'center' }}>
              <Button type='submit' variant='secondary' size='lg'>
                Adicionar amigo
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  );
}
