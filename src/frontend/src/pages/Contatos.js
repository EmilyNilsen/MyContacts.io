import React, { useEffect, useState } from 'react';
import { IoMdContact } from 'react-icons/io';
import { requestData } from '../services/api';

export default function Contatos() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <td className="col"><h2>Contatos</h2></td>
        <td className="col"> </td>
        <td className="col"> </td>
        <td className="col"> </td>
        <td className="col"> </td>
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
                <td className="action-values"> </td>
              </tr>
            </tbody>
          ),
        )}
    </table>
  );
}
