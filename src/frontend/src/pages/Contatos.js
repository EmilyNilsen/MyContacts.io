import React, { useEffect, useState } from 'react';
import { IoMdContact } from 'react-icons/io';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { requestData } from '../services/api';

import ModalContacts from '../components/modalContacts';
import ModalDelete from '../components/modalDelete';

export default function Contatos() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState();
  const [selectedContactName, setSelectedContactName] = useState();
  const [selectedContactPhone, setSelectedContactPhone] = useState();
  const [selectedContactEmail, setSelectedContactEmail] = useState();

  const showModal = (id, nome, telefone, email) => {
    setIsModalVisible(true);
    setSelectedContactId(id);
    setSelectedContactName(nome);
    setSelectedContactPhone(telefone);
    setSelectedContactEmail(email);
  };

  const showModalDelete = (id, nome) => {
    setIsModalDeleteVisible(true);
    setSelectedContact(id);
    setSelectedContactName(nome);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');

        const headers = { headers: { authorization: token } };

        const contactsList = await requestData('/contacts/list-contacts', headers);
        setContacts(contactsList);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return (
    <table className="table container-contacts-list">
      <thead>
        <td className="col"><h2>MyContacts.io</h2></td>
      </thead>
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
                    onClick={ () => showModal(id, nome, telefone, email) }
                  >
                    <BiEditAlt />
                  </button>
                  { isModalVisible
                    ? (<ModalContacts
                    /* eslint-disable indent */
                        id={ selectedContactId }
                        contactName={ selectedContactName }
                        contactTelefone={ selectedContactPhone }
                        contactEmail={ selectedContactEmail }
                        onClose={ () => setIsModalVisible(false) }
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
                    /* eslint-disable indent */
                        id={ selectedContact }
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
  );
}
