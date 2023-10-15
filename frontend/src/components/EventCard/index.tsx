import Link from 'next/link';
import React, { useContext, useEffect, useState, ReactNode } from 'react';
// import styles from './styles.module.scss';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { MainContext, MainProvider } from '../../contexts/Main';
import { api } from '../../services/api';
import PetCard from '../PetCard';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import { BsFillPencilFill } from 'react-icons/bs';
import moment from 'moment';
export interface EventData {
  id: Number;
  title: String;
  description: String;
  event_date: Date;
  event_time: Date;
  picture: string;
}

export function EventCard({ event, petId = null }) {
  const { amIOwner } = useContext(MainContext);
  const eventTime = moment(event.event_time, 'HH:mm:ss');

  let color = '#c2d9ff';
  let category = 'Regular';

  const cardTypeAndColor = () => {
    switch (event.category) {
      case 1:
        color = '#91b2eb';
        category = 'Regular';
        break;
      case 2:
        color = '#eb5757';
        category = 'Saúde';
        break;
      case 3:
        color = '#7FBA00';
        category = 'Consulta veterinária';
        break;
      case 4:
        color = '#FCCB3C';
        category = 'Vacina';
        break;
      default:
        color = '#91b2eb';
        category = 'Regular';
    }
  };

  cardTypeAndColor();

  return (
    <Card className={styles.eventCard}>
      <Row>
        <Col md={3} className={styles.petPictureCol}>
          <img src={event.picture} alt='' className={styles.petPicture} />
        </Col>
        <Col className={styles.infoCol}>
          <Row>
            <h3>{event.title}</h3>
          </Row>
          <Row>
            {amIOwner(event.pet) ? (
              <a href={`/pet/${petId}/evento/${event.id}`}>
                <>
                  <BsFillPencilFill
                    size={20}
                    style={{ marginRight: '0.5rem' }}
                  />
                  Editar evento
                </>
              </a>
            ) : (
              <></>
            )}
            <strong
              style={{
                display: 'flex',
                marginTop: '1rem',
                alignItems: 'center',
              }}
            >
              CATEGORIA:{' '}
              <div
                style={{
                  backgroundColor: `${color}`,
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '1rem',
                  margin: '0 0.5rem',
                }}
              />
              {category}
            </strong>
            <p>{event.description}</p>
          </Row>
          <Row>
            <Col>
              <strong>
                Data: <Badge>{event.event_date}</Badge>
              </strong>
            </Col>
            <Col>
              <strong>
                Hora: <Badge>{eventTime.format('HH:mm')}</Badge>
              </strong>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
