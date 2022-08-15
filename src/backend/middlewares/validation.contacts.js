const { Contacts } = require('../database/models');

const defaultApiReturn = require('../utils/defaultApiReturn');

const validatePhone = async (req, res, next) => {
  try {
    const { telefone } = req.body;

    if (telefone.toString().trim().length !== 11) {
      return res.status(400).json(defaultApiReturn({ error: { message: 'Número de telefone inválido.' } }));
    }
    
    const contactWithSamePhone = await Contacts.findOne({ where: { telefone, isActive: true }});

    if (contactWithSamePhone) {
      return res.status(400).json(defaultApiReturn({ error: { message: `Este telefone está associado ao contato: ${contactWithSamePhone.dataValues.nome}.` } }));
    }
    next();
  } catch(e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

const validateName = async (req, res, next) => {
  try {
    const { nome } = req.body;
    
    if (!nome || nome !== undefined && nome.length <= 0) {
      return res.status(400).json(defaultApiReturn({ error: { message: 'O campo Nome não pode estar vazio.' } }));
    }
    
    const contactWithSameName = await Contacts.findOne({ where: { nome, isActive: true }});

    if (contactWithSameName) {
      return res.status(400).json(defaultApiReturn({ error: { message: `Este Nome já está em uso por um dos seus contatos.` } }));
    }
    next();
  } catch(e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

module.exports = {
  validatePhone,
  validateName
}
