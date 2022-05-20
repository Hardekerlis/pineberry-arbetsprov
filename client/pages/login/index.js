import React, { useState, useContext } from 'react';

import styles from './login.module.sass';

import { useRouter } from 'next/router';

import { request } from 'helpers';
import { PromptContext } from 'contexts';

const Login = () => {
  const router = useRouter();

  const setPrompt = useContext(PromptContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const inputController = (event) => {
    const target = event.target;
    const value = target.value;
    if (target.name === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const inputs = event.target.getElementsByTagName('input');

    const values = {};

    for (const input of inputs) {
      values[input.name] = input.value;
    }

    request
      .post('/api/admin/login', values)
      .then((res) => {
        setPrompt({
          message: 'Inloggningen lyckades',
          level: 'info',
        });

        router.push('/admin');
      })
      .catch((err) => {
        setPrompt({
          message: 'Fel användarnamn eller lösenord',
          level: 'warn',
        });
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <span className={styles.header}>Login</span>
        <form onSubmit={submitHandler}>
          <input
            name="username"
            placeholder="Användarnamn"
            value={username}
            onChange={inputController}
          />
          <input
            name="password"
            placeholder="Lösenord"
            type="password"
            value={password}
            onChange={inputController}
          />
          <button type="submit">Logga in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
