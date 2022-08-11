const contactService = require('../services/contactService');

const listContactsByUserId = async (req, res) => {
  try {
    const { id } = req.tokenData;
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
    const { id } = req.tokenData;
    const response = await contactService.creteNewContact({ nome, telefone, email, userId: id });
    if (!response) {
      return res.status(400).json({ message: 'Este contato já existe'});
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
    if (!response) {
      return res.status(400).json({ message: 'Este contato não existe'});
    }
    return res.status(200).end();
  } catch (e) {
    console.error(e);
  }
}

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.tokenData.id;
    const response = await contactService.deleteContact({ id, userId });
    if (!response) {
      return res.status(400).json({ message: 'Este contato não existe'});
    }
    return res.status(204).end();
  } catch(e) {
    console.error(e);
  }
}

module.exports = {
  listContactsByUserId,
  creteNewContact,
  updateContact,
  deleteContact
};