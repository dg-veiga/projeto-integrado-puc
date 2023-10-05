import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button1 from '../../components/Button1'

import styles from './styles.module.scss';

import { login, getUserDetails } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

import {
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import { RootState } from '../../redux/store'

const Login: React.FC = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter();
  
  const dispatch = useDispatch();
  const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
  const userLogin = useReduxSelector(state => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const handleSubmit = (email, password) => {
    dispatch(login(email,password) as any)
  }

  useEffect(() => {
    if(userInfo){
      // dispatch()
      router.push('home/')
    }
  }, [userInfo])

  return (
    <body className={styles.loginBody}>
      <div className='container-md'>
        <div className='bs-docs-section'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className={styles.loginBox}>
              <img src={'./assets/logo_petpal_f.png'} alt="Logo" width={'240px'}/>
              <h1>Petpal</h1>
              <h3>Seu amigo em primeiro lugar</h3>
              <form 
                action='submit' 
                className={styles.loginForm} 
                onSubmit={event => { 
                  event.preventDefault(); 
                  // console.log(email, password);
                  handleSubmit(email, password);
                  }
                }
              >
                <fieldset>
                  <div className='form-group'>
                    <div className='form-floating mb-3'>
                      <input
                        type='email'
                        className='form-control'
                        id='floatingInput'
                        placeholder='name@example.com'
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor='floatingInput'>Email</label>
                    </div>
                    <div className='form-floating'>
                      <input
                        type='password'
                        className='form-control'
                        id='floatingPassword'
                        placeholder='Password'
                        autoComplete='off'
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor='floatingPassword'>Password</label>
                    </div>
                  </div>
                  <Button1 type={"submit"}>
                    Submit
                  </Button1>
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
