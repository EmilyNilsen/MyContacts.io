const { Contacts } = require('../models');

const listContactsByUserId = async ({ id }) => {
  const contacts = await Contacts.findAll({ where: { userId: id }, attributes: { exclude: ['id', 'data_cadastro', 'data_alteração', 'UserId', 'userId'] } });
  if (!contacts) return null;
  return contacts;
}

const cretedNewContact = async ({ nome, telefone, email, UserId}) => {
  const contactExist = await Contacts.findOne({ where: { nome, telefone, email } });
  if (contactExist) return null;

  const response = await Contacts.create({ nome, telefone, email, UserId });

  const getNewContact = await Contacts.findOne({ where: { id: response.id } })
  if (!getNewContact) return null;
  return getNewContact;
}

module.exports = { listContactsByUserId, cretedNewContact };
