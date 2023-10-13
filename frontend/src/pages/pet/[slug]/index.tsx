import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import BottomContainer from '../../../components/BottomContainer';
import { MainContext, MainProvider } from '../../../contexts/Main';
import Header from '../../../components/Header';
import MainContainer from '../../../components/MainContainer';
import { EventData, EventCard } from '../../../components/EventCard';
import CreateEventForm from '../../../components/CreateEventForm';
import { api, endpoints } from '../../../services/api';
import { Col, Row } from 'react-bootstrap';

import { FaPaw } from 'react-icons/fa';
import styles from './styles.module.css';

// import { Card, Row, Col, Form, Button } from 'react-bootstrap'

function PetPageBoxes() {
  const router = useRouter();
  const { userInfo } = useContext(MainContext);
  const { slug } = router.query;

  const [name, setName] = useState('');
  const [petPicture, setPetPicture] = useState('');
  const [events, setEvents] = useState([]);
  const [weights, setWeights] = useState([]);
  const [viewers, setViewers] = useState([]);

  function getPetPageInfo() {
    async function _call() {
      const url = `pet/${slug}/`;
      await api
        .get(url, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setName(response.data.name);
          setPetPicture(response.data.picture);
          setEvents([...response.data.events]);
          setWeights([...response.data.weights]);
          setViewers([...response.data.viewers]);
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  const mappedEvents = () => {
    return events.map((event, index) => <EventCard event={event} petId={slug}/>);
  };

  useEffect(() => {
    if (!slug) {
      return;
    } else {
      getPetPageInfo();
    }
  }, [slug]);

  return (
    <>
      <Row>
        <FaPaw size={80}/>
        <h1>{name}</h1>
      </Row>
      <BottomContainer>
          <Row md={12} className={styles.petPictureRow}>
            <img src={petPicture} alt="" className={styles.petPicture} />
          </Row>
        <Row>
          <Col>
            <h2>Próximos eventos:</h2>
          </Col>
          <Col>
            <h2 style={{textAlign: 'left'}}>+ Adicionar evento</h2>
          </Col>
        </Row>
        {events ? <>{mappedEvents()}</> : <></>}
        <h2>Peso:</h2>
        {weights ? <>{mappedEvents()}</> : <></>}
        <h2>Amigos:</h2>
        {viewers ? <>{mappedEvents()}</> : <></>}
      </BottomContainer>
    </>
  );
}

const PetPage: React.FC = () => {
  return (
    <MainProvider>
      <MainContainer>
        <Header />
        <PetPageBoxes />
      </MainContainer>
    </MainProvider>
  );
};

export default PetPage;
