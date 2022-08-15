const { User } = require('../database/models');
const defaultApiReturn = require('../utils/defaultApiReturn');

const validateEmailIsInUse = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (await User.findOne({ where: { email } })) {
      return res.status(400).json(defaultApiReturn({ error: { message: 'Já existe um usuário cadastrado com este Email' } }));
    }
    next();
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
};

module.exports = {
  validateEmailIsInUse
};
