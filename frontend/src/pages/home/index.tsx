import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { MainContext, MainProvider } from '../../contexts/Main';

import { Row, Col } from 'react-bootstrap';

import MainContainer from '../../components/MainContainer';
import PetList from '../../components/PetList';

const Home: React.FC = () => {
  return (
    <MainProvider>
      <MainContainer>
        <Header />
        <Row>
          <Col>
            <h2>Meus pets:</h2>
          </Col>
          <Col>
            <a href='/adiciona-pet'>
              <h2 style={{ textAlign: 'right' }}>+ Adicionar pet</h2>
            </a>
          </Col>
        </Row>
        <PetList />
      </MainContainer>
    </MainProvider>
  );
};

export default Home;
