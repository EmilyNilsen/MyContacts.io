const { Contacts } = require('../database/models');

const listContactsByUserId = async ({ id }) => {
  const contacts = await Contacts.findAll({ where: { userId: id, isActive: true }, attributes: { exclude: ['userId', 'UserId','data_cadastro', 'data_alteração', 'isActive'] } });
  if (!contacts) return null;
  return contacts;
}

const creteNewContact = async ({ nome, telefone, email, userId }) => {
  const contactExist = await Contacts.findOne({ where: { userId, isActive: true, nome, telefone, email } });
  if (contactExist) return null;
  return await Contacts.create({ nome: nome, telefone: telefone, email: email, userId: userId });
}

const updateContact = async ({ id, nome, telefone, email }) => {
  const contactExist = await Contacts.findOne({ where: { id } });
  if (!contactExist) return null;
  return await Contacts.update({ nome: nome, telefone: telefone, email: email, data_alteracao: Date.now() }, { where: { id: id } } );
}

const deleteContact = async ({ id, userId }) => {
  const contactExist = await Contacts.findOne({ where: { id, userId: userId, isActive: true } });
  if (!contactExist) return null;
  return await Contacts.update({ isActive: false }, { where: { id: id, userId: userId } });
}

module.exports = { listContactsByUserId, creteNewContact, updateContact, deleteContact };
