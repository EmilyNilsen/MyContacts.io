import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { userRequestTypeEnum, userRequestRouter } from '../services/api';

export const modalTypeEnum = {
  Update: 'update',
  Create: 'create',
};

export default function ModalRegister(
  { onClose, email = null, password = null },
) {
  const [disable, setDisable] = useState(true);
  const [emailInput, setEmailInput] = useState(email);
  const [passwordInput, setPasswordInput] = useState(password);

  const inputHandler = {
    email: (value) => { setEmailInput(value); },
    password: (value) => { setPasswordInput(value); },
  };

  const genericHandler = ({ target: { value, name } }) => {
    inputHandler[name](value);
  };

  const regiterUser = async () => {
    await userRequestRouter(
      userRequestTypeEnum.UserRegister,
      { email: emailInput, password: passwordInput },
    );
  };

  const modalOnClickHandler = async () => {
    await regiterUser();
    onClose();
  };

  useEffect(() => {
    const size = 0;
    const strPassword = passwordInput.toString();
    const testEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (testEmail.test(emailInput) && strPassword.length > size) {
      setDisable(false);
    }
  }, [emailInput, passwordInput]);

  return (
    <div className="modal">
      <div className="container-modal">
        <div className="content-modal">
          <h2>Cadastre-se</h2>
          <p>É rápido e fácil.</p>
          E-mail:
          <input
            name="email"
            type="text"
            defaultValue={ email }
            onChange={ (event) => { genericHandler(event); } }
          />
          Senha:
          <input
            name="password"
            type="password"
            defaultValue={ password }
            onChange={ (event) => { genericHandler(event); } }
          />
          <div className="edit-modal-button">
            <button
              type="submit"
              className="btn btn-danger btn-cancel"
              onClick={ () => onClose() }
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={ disable }
              className="btn btn-success btn-save"
              onClick={ () => modalOnClickHandler() }
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalRegister.propTypes = {
  onClose: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.number.isRequired,
};
