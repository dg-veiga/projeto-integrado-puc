import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../../../components/Header';
import { MainContext, MainProvider } from '../../../../../contexts/Main';

import MainContainer from '../../../../../components/MainContainer';
import CreateEventForm from '../../../../../components/CreateEventForm';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import BottomContainer from '../../../../../components/BottomContainer';


const EditarEvento: React.FC = () => {
  const router = useRouter();
  const { slug, eventId } = router.query;

  return (
    <MainProvider>
      <MainContainer>
        <Header />
        <h1>Editar Evento:</h1>
        <BottomContainer>
          <CreateEventForm id={slug} oldEventId={eventId}/>
        </BottomContainer>
      </MainContainer>
    </MainProvider>
  );
};

export default EditarEvento;
