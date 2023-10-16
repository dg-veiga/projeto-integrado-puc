import React from 'react';
import Header from '../../components/Header';
import { MainProvider } from '../../contexts/Main';

import { Row, Col } from 'react-bootstrap';

import MainContainer from '../../components/MainContainer';
import PetList from '../../components/PetList';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <MainProvider>
      <MainContainer>
        <Header />
        <Row>
          <Col>
            <h2>Meus pets:</h2>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <h2><Link href='/adiciona-pet'>+ Adicionar pet</Link></h2>
          </Col>
        </Row>
        <PetList />
      </MainContainer>
    </MainProvider>
  );
};

export default Home;
