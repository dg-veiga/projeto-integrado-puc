import React, { useEffect, useState, createContext, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';

import { api, endpoints } from '../services/api';
import { login, getUserDetails } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';

import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux/store';

interface MainContextData {
  userInfo: any;
  getSharedPetsIds: () => Array<number>;
  amIOwner: (petId: number) => boolean;
}

interface MainProviderProps {
  children: ReactNode;
}

export const MainContext = createContext({} as MainContextData);

export function MainProvider({ children }: MainProviderProps) {

  const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
  const userLogin = useReduxSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  function getSharedPetsIds() {
    const ids = typeof window !== "undefined" ? window.localStorage.getItem('sharedPetsIds') : '[]'
    return ids? JSON.parse(ids) : [];
  }

  function amIOwner(petId) {
    return !(getSharedPetsIds().includes(petId));
  }

  return (
    <MainContext.Provider
      value={{
        userInfo,
        getSharedPetsIds,
        amIOwner,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
