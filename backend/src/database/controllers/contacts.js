const contactService = require('../services/contacts');

const listContactsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await contactService.listContactsByUserId({ id });
    return res.status(200).json(response);
  } catch(e) {
    console.error(e);
    return res.status(404).end();
  }
}

const cretedNewContact = async (req, res) => {
  try {
    const { nome, telefone, email, UserId } = req.body;
    const response = await contactService.cretedNewContact({ nome, telefone, email, UserId });
    if (!response) {
      return res.status(409).json({ message: 'contact already exist'});
    }
    return res.status(201).end();
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  listContactsByUserId,
  cretedNewContact,
};
