/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RiContactsBookLine } from 'react-icons/ri';
import { requestLogin } from '../services/api';
import ModalRegister from '../components/modalRegistro';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [loginFailed, setLoginFailed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const redirectTo = useHistory();

  function showModal() {
    setIsModalVisible(true);
  }

  const inputHandler = {
    email: (value) => { setEmail(value); },
    password: (value) => { setPassword(value); },
  };

  const genericHandler = ({ target: { value, name } }) => {
    inputHandler[name](value);
  };

  const loginHandler = async () => {
    try {
      const response = await requestLogin({ email, password });
      localStorage.setItem('token', response.data.Token.toString());
      redirectTo.push('/home');
    } catch (e) {
      setLoginFailed(true);
    }
  };

  useEffect(() => {
    const minSize = 6;
    const testEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (testEmail.test(email) && password.length >= minSize) {
      setDisable(false);
    }
  }, [email, password]);

  return (
    <div className="container-login">
      <div className="mb-3">
        <span>
          <RiContactsBookLine className="icon-login" />
        </span>
      </div>
      <div className="mb-3">
        <label
          htmlFor="inputEmail1"
          className="form-label"
        >
          E-mail
          <input
            type="email"
            name="email"
            placeholder="email@email.com.br"
            className="form-control"
            id="inputEmail1"
            onChange={ (event) => { genericHandler(event); } }
          />
        </label>
      </div>
      <div className="mb-3">
        <label
          htmlFor="inputPassword1"
          className="form-label"
        >
          Senha
          <input
            type="password"
            name="password"
            placeholder="******"
            className="form-control"
            id="inputPassword1"
            onChange={ (event) => { genericHandler(event); } }
          />
        </label>
      </div>
      <div className="mb-3 container-login-button">
        <button
          type="submit"
          className="btn btn-dark button"
          disabled={ disable }
          onClick={ loginHandler }
        >
          Entrar
        </button>
        <div className="divider-line"> </div>
        <button
          type="submit"
          className="btn btn-dark button"
          onClick={ showModal }
        >
          Criar conta
        </button>
        {
          isModalVisible
            ? (<ModalRegister
                email={ email }
                password={ password }
                onClose={ () => setIsModalVisible(false) }
            />)
            : null
        }
      </div>
      { loginFailed ? (
        <span className="login-message-fail">
          Email ou senha incorreta!
        </span>
      ) : null }
    </div>
  );
}
