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
import BottomContainer from '../../../../components/BottomContainer';
import PetCard from '../../../../components/PetCard';
import PetList from '../../../../components/PetList';
import WeightRecord from '../../../../components/WeightRecord';

const Evento: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) {
      return;
    } else {
      console.log('slug', slug)
    }
  }, [slug]);

  return (
    <MainProvider>
      <Header />
      <MainContainer>
      <h1>Histórico de peso:</h1>
      <BottomContainer>
        {slug? <WeightRecord id={slug} />:<></>}
      </BottomContainer>
      </MainContainer>
    </MainProvider>
  );
};

export default Evento;
