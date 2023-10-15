import Link from 'next/link';
import React, { useContext, useEffect, useState, ReactNode } from 'react';
// import styles from './styles.module.scss';
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import {MainContext, MainProvider} from '../../contexts/Main'
import { api,  } from '../../services/api';
import PetCard from '../PetCard';

export default function CreateEventForm({id: Number}) {

  const [petList, setPetList] = useState([])

  const {
    userInfo,
  } = useContext(MainContext);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Título</Form.Label>
        <Form.Control placeholder=" " />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Categoria</Form.Label>
        <Form.Select>
          <option>Disabled select</option>
          <option>Disabled select 2</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descrição</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <h3>Anexos:</h3>
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <h3>Fotos:</h3>
        <Form.Control type="file" />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}
