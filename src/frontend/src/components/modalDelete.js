import PropTypes from 'prop-types';
import React from 'react';
import { contactRequestTypeEnum, contactRequestRouter } from '../services/api';

export default function ModalDelete({ onClose, id, contactName }) {
  const modalOnClickHandler = async () => {
    await contactRequestRouter({
      contactRequestType: contactRequestTypeEnum.DeleteContacts,
      contactId: id });
    onClose();
    window.location.reload();
  };

  return (
    <div className="modal">
      <div className="container-modal">
        <div className="content-modal delete">
          <h2>Deletar contato</h2>
          <p>
            Tem certeza que deseja excluir
            {' "'}
            { contactName }
            {'" '}
            da sua lista de contatos?
          </p>
          <div className="delete-modal-button">
            <button
              type="submit"
              className="btn btn-danger btn-cancel"
              onClick={ () => onClose() }
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-success btn-save"
              onClick={ () => modalOnClickHandler() }
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalDelete.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  contactName: PropTypes.string.isRequired,
};
