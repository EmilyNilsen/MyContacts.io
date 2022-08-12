import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { updateContact } from '../services/api';

export default function Modal(
  { onClose, id, contactName, contactTelefone, contactEmail },
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

  const getTokenAndUpdateContact = async () => {
    const token = localStorage.getItem('token');
    const headers = { headers: { authorization: token } };
    await updateContact('contacts/update', { id, nome, email, telefone }, headers);
  };

  const modalOnClickHandler = async (isUpdate) => {
    if (!isUpdate) {
      onClose();
    } else {
      await getTokenAndUpdateContact();
      onClose();
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
          <h2>Editar contato</h2>
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
              onClick={ () => modalOnClickHandler(false) }
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={ disable }
              className="btn btn-success btn-save"
              onClick={ () => modalOnClickHandler(true) }
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  contactName: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  contactTelefone: PropTypes.number.isRequired,
};
