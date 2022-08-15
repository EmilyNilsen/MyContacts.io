const { EmailIsValid } = require('../utils/emailValidator');
const defaultApiReturn = require('../utils/defaultApiReturn');

const validateEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email || email !== undefined && email.length <= 0) {
      return res.status(400).json(defaultApiReturn({ error: { message: 'O campo Email não pode estar vazio' } } ));
    }
    if (!EmailIsValid(email)) {
      return res.status(400).json(defaultApiReturn({ error: { message: "E-mail inválido" } }));
    }
    next();
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
};

const validatePassword = (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password || password !== undefined && password.length <= 0) {
      return res.status(400).json(defaultApiReturn({ error: { message: 'O campo Senha não pode estar vazio' } }));
    }
    next();
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
};

module.exports = {
  validateEmail,
  validatePassword,
};
