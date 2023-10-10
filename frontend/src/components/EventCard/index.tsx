import Link from 'next/link';
import React, { useContext, useEffect, useState, ReactNode } from 'react';
// import styles from './styles.module.scss';
import { Card, Row, Col, Badge } from 'react-bootstrap'
import {MainContext, MainProvider} from '../../contexts/Main'
import { api,  } from '../../services/api';
import PetCard from '../PetCard';
import { useRouter } from 'next/router';

export interface EventData {
  id: Number
  title: String
  description: String 
  event_date: Date 
  event_time: Date 
}

export function EventCard({event}) {

  console.log(event)

  return (
    <Card>
      <Row>
        <Col>
          <div style={{width: '120px', height: '120px', backgroundColor: 'red', borderRadius: '60px'}}></div>
        </Col>
        <Col>
          <Row>
            <h3>{event.title}</h3>
            <Link href='#'>Editar evento</Link>
          </Row>
          <Row>{event.description}</Row>
          <Row>
            <Col>Data: <Badge>{event.event_date}</Badge></Col>
            <Col>Hora: <Badge>{event.event_time}</Badge></Col>
          </Row>
        </Col>
      </Row>
    </Card> 
  );
}
