import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { MainContext } from '../../contexts/Main';
import { useDispatch } from 'react-redux';
import { getUserDetails, logout } from '../../redux/actions/userActions';
import Link from 'next/link';
import styles from './styles.module.css';
import { Col, Row } from 'react-bootstrap';

import { TbLogout } from 'react-icons/tb';
import { AiFillCalendar } from 'react-icons/ai';

export default function Header({}) {
  const { userInfo } = useContext(MainContext);

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout() as any);
  };

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
      dispatch(getUserDetails(userInfo.id) as any);
      setEmail(userInfo.email);
      setFullName(userInfo.first_name);
    } else {
      router.push('login/');
    }
  }, [userInfo]);

  return (
    <Row className={styles.header}>
      <Col md={2}>
        <Link href='/home'>
          <img
            src={'/assets/logo_petpal.png'}
            alt=''
            className={styles.headerPhoto}
          />
        </Link>
      </Col>
      <Col md={6}>
        <h1>{fullName}</h1>
        <h3>{email}</h3>
      </Col>
      <Col md={2}>
        <AiFillCalendar
          size={100}
          className={styles.logoutIcon}
          onClick={() => router.push('/calendar')}
        />
      </Col>
      <Col md={2}>
        <TbLogout
          size={100}
          className={styles.logoutIcon}
          onClick={logoutHandler}
        />
      </Col>
    </Row>
  );
}
