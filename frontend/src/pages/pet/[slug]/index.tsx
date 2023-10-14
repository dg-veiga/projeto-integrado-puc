import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import BottomContainer from '../../../components/BottomContainer';
import { MainContext, MainProvider } from '../../../contexts/Main';
import Header from '../../../components/Header';
import MainContainer from '../../../components/MainContainer';
import { EventCard } from '../../../components/EventCard';
import { api } from '../../../services/api';
import { Col, Row } from 'react-bootstrap';

import { FaPaw } from 'react-icons/fa';
import styles from './styles.module.css';
import WeightRecord from '../../../components/WeightRecord';
import ViewersList from '../../../components/ViewersList';
import Link from 'next/link';


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
    return events.map((event, index) => (
      <EventCard event={event} petId={slug} />
    ));
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
        <h1>{name}</h1>
      </Row>
      <BottomContainer>
        <Row md={12} className={styles.petPictureRow}>
          <img src={petPicture} alt='' className={styles.petPicture} />
        </Row>
        <Row className={styles.sectionRow}>
          <Col>
            <h2>Próximos eventos:</h2>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <h2>
              <Link href={`#`}>+ Criar evento</Link>
            </h2>
          </Col>
          {events ? <>{mappedEvents()}</> : <></>}
        </Row>
        <Row className={styles.sectionRow}>
          <Col>
            <h2>Acompanhamento de peso:</h2>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <h2>
              <Link href={`/pet/${slug}/peso`}>+ Adicionar pesagem</Link>
            </h2>
          </Col>
          {weights ? <WeightRecord id={slug} showForm={'false'}/> : <></>}
        </Row>
        <Row className={styles.sectionRow}>
          <h2>Compartilhado com:</h2>
          <ViewersList petId={slug} viewersList={viewers} />
        </Row>
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
