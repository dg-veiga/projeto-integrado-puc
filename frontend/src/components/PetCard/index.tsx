import Link from 'next/link';
import React, { useContext, useEffect, useState, ReactNode } from 'react';
// import styles from './styles.module.scss';
import { Card, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import styles from './styles.module.css';

interface PetData {
  id: Number;
  name: String;
  birthDate: Date;
  adoptionDate: Date;
  petPicture: string;
  eventNum: number;
  owner: boolean;
}

export default function PetCard({
  id,
  name,
  birthDate,
  adoptionDate,
  petPicture,
  eventNum,
  owner = false,
}: PetData) {
  const eventURL = `pet/${id}/eventos`;
  const createEventURL = `pet/${id}/evento`;
  const weightURL = `pet/${id}/peso`;

  const bd = new Date(birthDate);
  const formattedBD = `${bd.getUTCDate()}/${String(bd.getUTCMonth()).padStart(
    2,
    '0'
  )}/${bd.getUTCFullYear()}`;

  var x = moment(Date.now());
  var y = moment(adoptionDate);
  var age = moment.duration(x.diff(y));

  return (
    <Card className={styles.petCard}>
      <Row className={styles.petRow}>
        <Col md={3} className={styles.petPictureCol}>
          <a href={`/pet/${id}/`}>
            <img src={petPicture} alt='' className={styles.petPicture} />
          </a>
        </Col>
        <Col md={9}>
          <h2>{name}</h2>
          <p>
            Meu amigo a {age.years()} anos e {age.months()} meses
          </p>
          <p>Data de nascimento: {formattedBD}</p>
          <Row>
            <Col>
              <Link href={eventURL}>Ver eventos</Link>
            </Col>
            {owner ? (
              <Col>
                <Link href={createEventURL}>Criar evento</Link>
              </Col>
            ) : (
              <></>
            )}
            <Col>
              <Link href={weightURL}>Acompanhamento de peso</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
