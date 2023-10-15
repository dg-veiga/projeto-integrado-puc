import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button1 from '../../components/Button1';
import { Row, Col, Button, Alert } from 'react-bootstrap';

import styles from './styles.module.css';

import { login, getUserDetails } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../redux/store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
  const userLogin = useReduxSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const handleSubmit = (email, password) => {
    dispatch(login(email, password) as any);
  };

  useEffect(() => {
    if (userInfo) {
      router.push('home/');
    }
  }, [userInfo]);

  return (
    <body className={styles.loginBody}>
      <div className='container-md'>
        <div className='bs-docs-section'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className={styles.loginBox}>
              <img
                src={'./assets/logo_petpal.png'}
                alt='Logo'
                width={'240px'}
                style={{marginTop: '2rem'}}
              />
              <h1 className={styles.logoTitle}>PETPAL</h1>
              <h4 className={styles.logoSubTitle}>SEU AMIGO EM</h4>
              <h4 className={styles.logoSubTitle}>PRIMEIRO LUGAR</h4>
              {error && <Alert variant='danger' dismissible>{error}</Alert>}
              <form
                action='submit'
                className={styles.loginForm}
                onSubmit={(event) => {
                  event.preventDefault();
                  // console.log(email, password);
                  handleSubmit(email, password);
                }}
              >
                <fieldset>
                  <div className='col form-group'>
                    <div className='form-floating mb-3'>
                      <input
                        type='email'
                        className='form-control'
                        id='floatingInput'
                        placeholder='name@example.com'
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor='floatingInput'>E-mail</label>
                    </div>
                    <div
                      className='form-floating'
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className='form-control'
                        id='floatingPassword'
                        placeholder='Password'
                        autoComplete='off'
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor='floatingPassword'>Senha</label>
                      {showPassword ? (
                        <AiOutlineEye
                          size={30}
                          onClick={() => setShowPassword(false)}
                          className={styles.passwordEye}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          size={30}
                          onClick={() => setShowPassword(true)}
                          className={styles.passwordEye}
                        />
                      )}
                    </div>
                  </div>
                  <Row
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '2rem'
                    }}
                  >
                    <Button type='submit' variant='secondary' size='lg'>
                      <strong>Entrar</strong>
                    </Button>
                  </Row>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
