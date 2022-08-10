const { Contacts } = require('../models');

const listContactsByUserId = async ({ id }) => {
  const contacts = await Contacts.findAll({ where: { userId: id }, attributes: { exclude: ['userId', 'UserId','data_cadastro', 'data_alteração'] } });
  if (!contacts) return null;
  return contacts;
}

const creteNewContact = async ({ nome, telefone, email, userId }) => {
  const contactExist = await Contacts.findOne({ where: { nome, telefone, email } });
  if (contactExist) return null;
  return await Contacts.create({ nome: nome, telefone: telefone, email: email, userId: userId });
}

const updateContact = async ({ id, nome, telefone, email }) => {
  const contactExist = await Contacts.findOne({ where: { id } });
  if (!contactExist) return null;
  return await Contacts.update({ nome: nome, telefone: telefone, email: email, data_alteracao: Date.now() }, { where: { id: id } } );
}

module.exports = { listContactsByUserId, creteNewContact, updateContact };
