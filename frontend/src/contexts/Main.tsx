import React, { useEffect, useState, createContext, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header'

import { api, endpoints } from '../services/api';
import { login, getUserDetails } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';

import {
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import { RootState } from '../redux/store'

interface MainContextData {
  userInfo: any;
  // user: any;
}

interface MainProviderProps {
  children: ReactNode;
}

export const MainContext = createContext({} as MainContextData);

export function MainProvider({ children }: MainProviderProps) {

  const [message, setMessage] = useState<any>({});

  // const dispatch = useDispatch();
  const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
  const userLogin = useReduxSelector(state => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  // const userDetails = useReduxSelector(state => state.userDetails);
  // const { user } = userDetails;

  // function getAllowAnyRoute(userId) {
  //   async function _call() {
  //     const url = `user/${userId}/`;
  //     await api
  //       .get(
  //         url,
  //         {
  //           headers: {
  //             'Content-type': 'application/json',
  //             Authorization: `Bearer ${userInfo.access}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log('messafe')
  //         setMessage(response.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   _call();
  // }

  return (
    <MainContext.Provider
      value={{
        userInfo,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
