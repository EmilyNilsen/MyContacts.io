/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RiContactsBookLine } from 'react-icons/ri';

import { userRequestTypeEnum, userRequestRouter } from '../services/api';
import ErrorMessage from '../components/errorMessage';
import UserRegisterModal from '../components/userRegisterModal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [requestErrorList, setRequestErrorList] = useState([]);

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
  const { apiResponse } = await userRequestRouter(
    userRequestTypeEnum.UserLogin,
    { email, password },
    );
    if (apiResponse.errors.length > 0) {
      setRequestErrorList(apiResponse.errors);
    } else {
      localStorage.setItem('token', apiResponse.data.token.toString());
      redirectTo.push('/home');
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
            ? (<UserRegisterModal
                email={ email }
                password={ password }
                onClose={ () => setIsModalVisible(false) }
            />)
            : null
        }
      </div>
      <ErrorMessage
        requestErrorList={ requestErrorList }
      />
    </div>
  );
}
