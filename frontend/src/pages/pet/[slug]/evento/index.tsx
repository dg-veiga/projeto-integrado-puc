import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../../components/Header';
import { MainContext, MainProvider } from '../../../../contexts/Main';

import MainContainer from '../../../../components/MainContainer';
import CreateEventForm from '../../../../components/CreateEventForm';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const Evento: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  console.log('slug', slug)

  // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

  // const renderLineChart = (
  //   <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
  //     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  //     <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  //     <XAxis dataKey="name" />
  //     <YAxis />
  //     {/* <Tooltip /> */}
  //   </LineChart>
  // );

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
