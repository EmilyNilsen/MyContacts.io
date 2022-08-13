import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { contactRequestTypeEnum, contactRequestRouter } from '../services/api';

export const modalTypeEnum = {
  Update: 'update',
  Create: 'create',
};

export default function ModalContacts(
  { onClose, id = null, contactName = null, contactTelefone = null, contactEmail = null },
) {
  const [disable, setDisable] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const inputHandler = {
    nome: (value) => { setNome(value); },
    email: (value) => { setEmail(value); },
    telefone: (value) => { setTelefone(value); },
  };

  const genericHandler = ({ target: { value, name } }) => {
    inputHandler[name](value);
  };

  const updateContact = async () => {
    await contactRequestRouter({
      contactRequestType: contactRequestTypeEnum.UpdateContacts,
      body: { id, nome, email, telefone },
    });
  };

  const createContact = async () => {
    await contactRequestRouter({
      contactRequestType: contactRequestTypeEnum.CreateContacts,
      body: { nome, email, telefone },
    });
  };

  const modalOnClickHandler = async () => {
    const modalTypeEnumerator = id ? modalTypeEnum.Update : modalTypeEnum.Create;
    if (modalTypeEnumerator === modalTypeEnum.Create) {
      await createContact();
      window.location.reload();
    } else if (modalTypeEnumerator === modalTypeEnum.Update) {
      await updateContact();
      window.location.reload();
    }
    onClose();
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
          <h2>
            {
              id ? 'Editar' : 'Adicionar'
            }
            {' '}
            contatos
          </h2>
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

ModalContacts.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  contactName: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  contactTelefone: PropTypes.number.isRequired,
};
