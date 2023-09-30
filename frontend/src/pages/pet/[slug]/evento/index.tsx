import React, { useEffect, useState } from 'react';
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
import PetList from '../../../../components/PetList';
import CreateEventForm from '../../../../components/CreateEventForm';

const Evento: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  console.log('slug', slug)

  return (
    <MainProvider>
      <Header />
      <MainContainer>
        <h1>Novo Evento:</h1>
        <CreateEventForm id={slug} />
      </MainContainer>
    </MainProvider>
  );
};

export default Evento;
