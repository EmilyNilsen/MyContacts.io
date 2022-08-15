/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdContact } from 'react-icons/io';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { contactRequestTypeEnum, contactRequestRouter } from '../services/api';
import AddContactModal from '../components/addContactModal';
import EditContactModal from '../components/editContactModal';
import ModalDelete from '../components/deleteContactModal';

// eslint-disable-next-line react-hooks/rules-of-hooks
export default function Contatos() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState();
  const [selectedContactName, setSelectedContactName] = useState();
  const [selectedContactPhone, setSelectedContactPhone] = useState();
  const [selectedContactEmail, setSelectedContactEmail] = useState();

  const redirectTo = useHistory();

  function redirectIfUserNotLogged() {
    const token = localStorage.getItem('token');
    if (!token) {
      redirectTo.push('/login');
    }
  }
  redirectIfUserNotLogged();

  const logout = () => {
    localStorage.removeItem('token');
    redirectTo.push('/login');
  };

  function setContactInputValuesToEditModal(id, nome, telefone, email) {
    setSelectedContactId(id);
    setSelectedContactName(nome);
    setSelectedContactPhone(telefone);
    setSelectedContactEmail(email);
  }

  const showModalDelete = (id, nome) => {
    setIsModalDeleteVisible(true);
    setSelectedContactId(id);
    setSelectedContactName(nome);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { apiResponse } = await contactRequestRouter(
          { contactRequestType: contactRequestTypeEnum.GetUserContacts },
        );
        setContacts(apiResponse.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container-contacts-list">
      <div className="container-header-contacts">
        <h2>MyContacts.io</h2>
        <button
          className="btn btn-secondary add-contact"
          type="button"
          onClick={ () => setIsModalAddVisible(true) }
        >
          Adicionar Contato
        </button>
        { isModalAddVisible
            ? (<AddContactModal
                onClose={ () => setIsModalAddVisible(false) }
            />)
              : null }
        <button
          type="submit"
          onClick={ () => logout() }
          className="btn btn-dark"
        >
          Sair
        </button>
      </div>
      <table className="table container-table">
        <thead>
          <tr>
            <td className="col icon-collumn"> </td>
            <td className="col name-values">Nome</td>
            <td className="col">Telefone</td>
            <td className="col">E-mail</td>
            <td className="col action-collumn">Ações</td>
          </tr>
        </thead>
        { loading ? <span>loading...</span>
        : contacts.map(
          ({ id, nome, telefone, email }) => (
            <tbody key={ id } className="container text-center">
              <tr>
                <td className="icon-values"><IoMdContact /></td>
                <td className="name-values">{ nome }</td>
                <td>{ telefone }</td>
                <td>{ email }</td>
                <td className="action-values">
                  <a
                    className="icon-values button-whatsapp"
                    href={ `https://api.whatsapp.com/send?phone=${telefone}&text=Olá,%20` }
                  >
                    <AiOutlineWhatsApp />
                  </a>
                  <button
                    className="btn btn-link button-edit"
                    type="button"
                    onClick={ () => {
                      setContactInputValuesToEditModal(id, nome, telefone, email);
                      setIsModalEditVisible(true);
                    } }
                  >
                    <BiEditAlt />
                  </button>
                  { isModalEditVisible
                    ? (<EditContactModal
                        id={ selectedContactId }
                        contactName={ selectedContactName }
                        contactTelefone={ selectedContactPhone }
                        contactEmail={ selectedContactEmail }
                        onClose={ () => setIsModalEditVisible(false) }
                    />)
                    : null }
                  <button
                    type="button"
                    className="btn btn-link button-delete"
                    onClick={ () => showModalDelete(id, nome) }
                  >
                    <RiDeleteBin5Line />
                  </button>
                  { isModalDeleteVisible
                    ? (<ModalDelete
                        id={ selectedContactId }
                        contactName={ selectedContactName }
                        onClose={ () => setIsModalDeleteVisible(false) }
                    />)
                    : null }
                </td>
              </tr>
            </tbody>
          ),
        )}
      </table>
    </div>
  );
}
