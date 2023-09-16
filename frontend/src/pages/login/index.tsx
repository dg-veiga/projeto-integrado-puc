import React from 'react';
import { useRouter } from 'next/router';
import Button1 from '../../components/Button1'

import styles from './styles.module.scss';

const login: React.FC = () => {
  return (
    <body className={styles.loginBody}>
      <div className='container-md'>
        <div className='bs-docs-section'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className={styles.loginBox}>
              <img src={'./assets/logo_petpal_f.png'} alt="Logo" />
              <form action='submit' className={styles.loginForm}>
                <fieldset>
                  <div className='form-group'>
                    <div className='form-floating mb-3'>
                      <input
                        type='email'
                        className='form-control'
                        id='floatingInput'
                        placeholder='name@example.com'
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
                      />
                      <label htmlFor='floatingPassword'>Password</label>
                    </div>
                  </div>
                  <Button1 type="submit">
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

export default login;
