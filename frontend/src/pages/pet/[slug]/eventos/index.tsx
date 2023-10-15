import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../../components/Header';
import { MainContext, MainProvider } from '../../../../contexts/Main';

import { api } from '../../../../services/api';

import MainContainer from '../../../../components/MainContainer';
import { EventCard } from '../../../../components/EventCard';
import Link from 'next/link';

import { Row, Col, Alert } from 'react-bootstrap';
import BottomContainer from '../../../../components/BottomContainer';
import PetPictureContainerHeader from '../../../../components/PetPictureContainerHeader';

function EventsList({ id }) {
  const [eventList, setEventList] = useState([]);

  const { userInfo, amIOwner } = useContext(MainContext);

  function getEventList(petId) {
    async function _call() {
      const url = petId ? `event/?pet=${petId}` : `event/`;
      await api
        .get(url, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`,
          },
        })
        .then((response) => {
          setEventList(response.data);
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  useEffect(() => {
    getEventList(id);
  }, [id]);

  const events = eventList.map((event, index) => (
    <EventCard event={event} petId={id} />
  ));

  return (
    <>
      {eventList.length > 0 ? (
        events
      ) : (
        <Alert variant={'warning'}>
          Não existem eventos cadastrados para este pet.
        </Alert>
      )}
    </>
  );
}

const Eventos: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [petId, setPetId] = useState(null);

  useEffect(() => {
    if (!slug) {
      return;
    } else {
      setPetId(slug as any);
    }
  }, [slug]);

  return (
    <MainProvider>
      <MainContainer>
        <Header />
        <Row>
          <Col>
            <h1>Eventos:</h1>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <h2>
              <Link href={`/pet/${petId}/evento`}>+ Criar evento</Link>
            </h2>
          </Col>
        </Row>
        <BottomContainer>
          <PetPictureContainerHeader petId={petId} />
          <EventsList id={slug} />
        </BottomContainer>
      </MainContainer>
    </MainProvider>
  );
};

export default Eventos;
