import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { contactRequestTypeEnum, contactRequestRouter } from '../services/api';
import ErrorMessage from './errorMessage';

export default function EditContactModal(
  { onClose, id, contactName, contactTelefone, contactEmail },
) {
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

  const updateContact = async () => {
    const { apiResponse } = await contactRequestRouter({
      contactRequestType: contactRequestTypeEnum.UpdateContacts,
      body: { id, nome, email, telefone },
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
          <h2>Editar Contato</h2>
          Nome:
          <input
            name="nome"
            type="text"
            defaultValue={ contactName }
            onChange={ (event) => { genericHandler(event); } }
          />
          Telefone:
          <input
            name="telefone"
            type="integer"
            defaultValue={ contactTelefone }
            onChange={ (event) => { genericHandler(event); } }
          />
          E-mail
          <input
            name="email"
            type="email"
            defaultValue={ contactEmail }
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
              onClick={ updateContact }
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

EditContactModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  contactName: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  contactTelefone: PropTypes.number.isRequired,
};
