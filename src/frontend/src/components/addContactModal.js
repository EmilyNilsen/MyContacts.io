import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { contactRequestTypeEnum, contactRequestRouter } from '../services/api';
import ErrorMessage from './errorMessage';

export default function AddContactModal({ onClose }) {
  const [disable, setDisable] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [requestErrorList, setRequestErrorList] = useState([]);

  const inputHandler = {
    nome: (value) => { setNome(value); },
    email: (value) => { setEmail(value); },
    telefone: (value) => { setTelefone(value); },
  };

  const genericHandler = ({ target: { value, name } }) => {
    inputHandler[name](value);
  };

  const createContact = async () => {
    const { apiResponse } = await contactRequestRouter({
      contactRequestType: contactRequestTypeEnum.CreateContacts,
      body: { nome, email, telefone },
    });
    if (apiResponse.errors.length > 0) {
      setRequestErrorList(apiResponse.errors);
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    const size = 11;
    const strTelefone = telefone.toString();
    const testEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (testEmail.test(email) && strTelefone.length === size) {
      setDisable(false);
    }
  }, [nome, email, telefone]);

  return (
    <div className="modal">
      <div className="container-modal">
        <div className="content-modal">
          <h2>Adicionar Contato</h2>
          Nome:
          <input
            name="nome"
            type="text"
            onChange={ (event) => { genericHandler(event); } }
          />
          Telefone:
          <input
            name="telefone"
            type="integer"
            onChange={ (event) => { genericHandler(event); } }
          />
          E-mail
          <input
            name="email"
            type="email"
            onChange={ (event) => { genericHandler(event); } }
          />
          <div className="modal-buttons">
            <button
              type="submit"
              className="btn btn-danger btn-cancel"
              onClick={ onClose }
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={ disable }
              className="btn btn-success btn-save"
              onClick={ createContact }
            >
              Salvar
            </button>
          </div>
          <ErrorMessage
            requestErrorList={ requestErrorList }
          />
        </div>
      </div>
    </div>
  );
}

AddContactModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
