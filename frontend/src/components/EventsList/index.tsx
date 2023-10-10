import Link from 'next/link';
import React, { useContext, useEffect, useState, ReactNode } from 'react';
// import styles from './styles.module.scss';
import { Card, Row, Col, Badge } from 'react-bootstrap'
import {MainContext, MainProvider} from '../../contexts/Main'
import { api,  } from '../../services/api';
import PetCard from '../PetCard';
import { useRouter } from 'next/router';
import {EventCard, EventData} from '../EventCard';


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
    <EventCard event={event} />
  )

  return (
    <>
      {eventList? events : <></>}
    </>
  );
}
