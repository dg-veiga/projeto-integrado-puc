import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../../components/Header';
import { MainProvider } from '../../../../contexts/Main';

import MainContainer from '../../../../components/MainContainer';
import BottomContainer from '../../../../components/BottomContainer';
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
      <MainContainer>
      <Header />
      <h1>Histórico de peso:</h1>
      <BottomContainer>
        {slug? <WeightRecord id={slug} />:<></>}
      </BottomContainer>
      </MainContainer>
    </MainProvider>
  );
};

export default Evento;
