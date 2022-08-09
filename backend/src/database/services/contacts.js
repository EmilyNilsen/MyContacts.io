const { Contacts } = require('../models');

const listContactsByUserId = async ({ id }) => {
  const contacts = await Contacts.findAll({ where: { userId: id }, attributes: { exclude: ['id', 'data_cadastro', 'data_alteração', 'UserId', 'userId'] } });
  if (!contacts) return null;
  return contacts;
}

module.exports = { listContactsByUserId };
