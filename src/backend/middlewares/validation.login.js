const { EmailIsValid } = require('../utils/emailValidator');

const validateEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email || email !== undefined && email.length <= 0) {
      return res.status(400).json({ message: 'O campo "Email" não pode estar vazio' });
    }
    if (!EmailIsValid(email)) {
      return res.status(400).json({ message: "E-mail inválido"});
    }
    next();
  } catch (e) {
    next(e);
  }
};

const validatePassword = (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password || password !== undefined && password.length <= 0) {
      return res.status(400).json({ message: 'O campo "Senha" não pode estar vazio' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  validateEmail,
  validatePassword,
};
