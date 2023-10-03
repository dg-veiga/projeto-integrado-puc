import Link from 'next/link';
import React, { useContext, useEffect, useState, ReactNode } from 'react';
// import styles from './styles.module.scss';
import { Card, Row, Col, Badge } from 'react-bootstrap'
import {MainContext, MainProvider} from '../../contexts/Main'
import { api,  } from '../../services/api';
import PetCard from '../PetCard';
import { useRouter } from 'next/router';

interface EventData {
  id: Number
  title: String
  description: String 
  event_date: Date 
  event_time: Date 
}

export default function EventsList({}) {

  const router = useRouter();

  const [eventList, setEventList] = useState([])

  const {
    userInfo,
  } = useContext(MainContext);

  function getEventsList() {
    async function _call() {
      const url = `event/`;
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
          setEventList(response.data);
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  useEffect(() => {
    getEventsList()
  }, [])

  const events = eventList.map((event: EventData, index) => 
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
  )

  return (
    <>
      {eventList? events : <></>}
    </>
  );
}