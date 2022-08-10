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

const creteNewContact = async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;
    const { id } = req.tokenData.id;
    const response = await contactService.creteNewContact({ nome, telefone, email, id });
    if (!response) {
      return res.status(409).json({ message: 'contact already exist'});
    }
    return res.status(201).end();
  } catch (e) {
    console.error(e);
  }
}

const updateContact = async (req, res) => {
  try {
    const { id, nome, telefone, email } = req.body;
    const response = await contactService.updateContact({ id, nome, telefone, email });
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  listContactsByUserId,
  creteNewContact,
  updateContact,
};
