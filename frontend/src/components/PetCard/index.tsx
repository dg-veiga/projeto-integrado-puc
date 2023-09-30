import Link from 'next/link';
import React, { useContext, useEffect, useState, ReactNode } from 'react';
// import styles from './styles.module.scss';
import { Card, Row, Col } from 'react-bootstrap';
import moment from 'moment';

interface PetData {
  id: Number;
  name: String;
  birthDate: Date;
  adoptionDate: Date;
}

export default function PetCard({
  id,
  name,
  birthDate,
  adoptionDate,
}: PetData) {
  const eventURL = `pet/${id}/eventos`;
  const createEventURL = `pet/${id}/evento`;
  const weightURL = `pet/${id}/peso`;

  const bd = new Date(birthDate);

  var x = moment(Date.now());
  var y = moment(adoptionDate);
  var age = moment.duration(x.diff(y));
  console.log(age);

  return (
    <Card>
      <Row>
        <Col>
          <a href={`/pet/${id}/`}>
            <div
              style={{
                width: '120px',
                height: '120px',
                backgroundColor: 'red',
                borderRadius: '60px',
              }}
            ></div>
          </a>
        </Col>
        <Col>
          <h1>{name}</h1>
          <p>
            meu amigo a {age.years()} anos e {age.months()} meses
          </p>
          <p>Data de nascimento: {bd.toLocaleDateString()}</p>
          <Row>
            <Col>
              <Link href={eventURL}>Ver eventos</Link>
            </Col>
            <Col>
              <Link href={createEventURL}>Criar evento</Link>
            </Col>
            <Col>
              <Link href={weightURL}>Acompanhamento de peso</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
