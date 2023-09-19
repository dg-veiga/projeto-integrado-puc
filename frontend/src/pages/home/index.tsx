import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { api, endpoints } from '../../services/api';
import { login, getUserDetails } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

import {
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import { RootState } from '../../redux/store'

const Home: React.FC = () => {
  const [message, setMessage] = useState<any>({});

  const router = useRouter();
  
  const dispatch = useDispatch();
  const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
  const userLogin = useReduxSelector(state => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  function getAllowAnyRoute(userId) {
    async function _call() {
      const url = `user/${userId}/`;
      await api
        .get(
          url,
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.access}`,
            },
          }
        )
        .then((response) => {
          console.log('messafe')
          setMessage(response.data);
        })
        .catch((err) => console.log(err));
    }
    _call();
  }

  useEffect(() => {
    if(userInfo){
      console.log(userInfo)
      dispatch(getUserDetails(userInfo.id))
      getAllowAnyRoute(userInfo.id);
    } else {
      router.push('login/')
    }
  }, [])

  return (
    <div>
      <h1>{message.username}</h1>
      <h1>{message.first_name}</h1>
    </div>
  );
};

export default Home;
