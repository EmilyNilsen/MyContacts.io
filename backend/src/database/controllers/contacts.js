const contactService = require('../services/contacts');

const listContactsByUserId = async (req, res) => {
  const { id } = req.params;
  const response = await contactService.listContactsByUserId({ id });
  if (!response) return res.status(404).json({ message: 'Contacts not found'})
  return res.status(200).json(response);
}

module.exports = listContactsByUserId;
