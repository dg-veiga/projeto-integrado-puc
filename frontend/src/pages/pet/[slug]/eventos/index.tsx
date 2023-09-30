import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../../components/Header';
import Mai from '../../../../components/Header';
import { MainContext, MainProvider } from '../../../../contexts/Main';
import { Container } from 'react-bootstrap'

import { api, endpoints } from '../../../../services/api';
import { login, getUserDetails } from '../../../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../../../redux/store';
import MainContainer from '../../../../components/MainContainer';
import PetCard from '../../../../components/PetCard';
import EventsList from '../../../../components/EventsList';
import CreateEventForm from '../../../../components/CreateEventForm';
import Link from 'next/link';

import { Card, Row, Col, Form, Button } from 'react-bootstrap'

const Eventos: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  // const [eventList, setEventList] = useState([])

  // const {
  //   userInfo,
  // } = useContext(MainContext);

  // function getEventList() {
  //   async function _call() {
  //     const url = `event/`;
  //     await api
  //       .get(
  //         url,
  //         {
  //           headers: {
  //             'Content-type': 'application/json',
  //             Authorization: `Bearer ${userInfo.access}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response.data)
  //         setEventList(response.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   _call();
  // }

  // useEffect(() => {
  //   getEventList()
  // }, [])

  // console.log('slug', slug)

  // const events = eventList.map((event, index) => 
  //   <Card>
  //     <Row></Row>
  //     <Row></Row>
  //     <Row></Row>
  //     <Row></Row>
  //   </Card>  
  // )

  return (
    <MainProvider>
      <Header />
      <MainContainer>
        <h1>Eventos:</h1>
        <Row>
          <Col>
            <Link href={`pet/${slug}/evento`}>+ Criar evento</Link>
          </Col>
        </Row>
        <EventsList />
      </MainContainer>
    </MainProvider>
  );
};

export default Eventos;
