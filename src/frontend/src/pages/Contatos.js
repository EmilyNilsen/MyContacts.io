import React, { useEffect, useState } from 'react';
import { IoMdContact } from 'react-icons/io';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { requestData } from '../services/api';

import ModalContacts from '../components/modalContacts';

export default function Contatos() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState();

  const showModal = (id) => {
    setIsModalVisible(true);
    setSelectedContact(id);
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
        <tr>
          <td className="col"><h2>MyContacts.io</h2></td>
        </tr>
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
                    className="icon-values"
                    href={ `https://api.whatsapp.com/send?phone=${telefone}&text=Olá,%20` }
                  >
                    <AiOutlineWhatsApp />
                  </a>
                  <button
                    className="btn btn-link button-edit"
                    type="button"
                    onClick={ () => showModal(id) }
                  >
                    <BiEditAlt />
                  </button>
                  { isModalVisible
                    ? (<ModalContacts
                    /* eslint-disable indent */
                        id={ selectedContact }
                        contactName={ nome }
                        contactTelefone={ telefone }
                        contactEmail={ email }
                        onClose={ () => setIsModalVisible(false) }
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
