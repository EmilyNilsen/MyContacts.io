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

module.exports = listContactsByUserId;
