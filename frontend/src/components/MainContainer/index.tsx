import React, { useContext, useEffect, useState, ReactNode } from 'react';
import styles from './styles.module.scss';
import {Container, Card} from 'react-bootstrap'
// import { useRouter } from 'next/router';

// import {MainContext, MainProvider} from '../../contexts/Main'
// import { useDispatch } from 'react-redux';
// import { getUserDetails } from '../../redux/actions/userActions';
interface MainContainerProps {
  children: ReactNode;
}

export default function MainContainer({children}: MainContainerProps) {
  
  // const {
  //   userInfo,
  // } = useContext(MainContext);

  // const [ email, setEmail ] =useState('')
  // const [ fullName, setFullName ] =useState('')

  // const router = useRouter();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if(userInfo){
  //     setEmail(userInfo.email)
  //     setFullName(userInfo.full_name)
  //   } else {
  //     router.push('login/')
  //   }
  // }, [userInfo])

  return (
    <Container>
      {children}
    </Container>
  );
}
