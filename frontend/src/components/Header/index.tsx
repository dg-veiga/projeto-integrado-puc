import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {MainContext, MainProvider} from '../../contexts/Main'
import { useDispatch } from 'react-redux';
import { getUserDetails, logout } from '../../redux/actions/userActions';
import Link from 'next/link';


export default function Header({}) {
  
  const {
    userInfo,
  } = useContext(MainContext);

  const [ email, setEmail ] =useState('')
  const [ fullName, setFullName ] =useState('')

  const router = useRouter();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if(userInfo){
      dispatch(getUserDetails(userInfo.id))
      setEmail(userInfo.email)
      setFullName(userInfo.full_name)
    } else {
      router.push('login/')
    }
  }, [userInfo])

  return (
    <div className='bs-docs-section'>
      <div className='container'>
        <div className='row'>
          <Link href='/home'>Home</Link>
          <div className='col'>{email}</div>
          <div className='col'>{fullName}</div>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </div>
  );
}
