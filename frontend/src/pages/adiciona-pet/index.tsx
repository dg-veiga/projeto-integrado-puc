import React from 'react';
import Header from '../../components/Header';
import BottomContainer from '../../components/BottomContainer';
import AddPetForm from '../../components/AddPetForm';

import { MainProvider } from '../../contexts/Main';
import MainContainer from '../../components/MainContainer';

const AddPet: React.FC = () => {
  return (
    <MainProvider>
      <MainContainer>
        <Header />
        <h2>Novo pet:</h2>
        <BottomContainer>
          <AddPetForm />
        </BottomContainer>
      </MainContainer>
    </MainProvider>
  );
};

export default AddPet;
