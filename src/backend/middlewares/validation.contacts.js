const defaultApiReturn = require('../utils/defaultApiReturn');

const validateTelefone = (req, res, next) => {
  try {
    const { telefone } = req.body;
    const telefoneString = telefone.toString().trim();
    if (telefoneString.length !== 11) {
      return res.status(400).json(defaultApiReturn({ error: { message: 'Número de telefone inválido' } }));
    }
    next();
  } catch(e) {
    console.error(e);
  }
}

module.exports = {
  validateTelefone
}
