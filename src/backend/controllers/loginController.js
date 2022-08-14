const authService = require('../services/authService');
const defaultApiReturn = require('../utils/defaultApiReturn');

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  const response = await authService.authentication({ email, password });
  if (!response) return res.status(404).json(defaultApiReturn({ error: { message: 'Usuário não encontrado'} }));
  return res.status(200).json(defaultApiReturn({ response: response }));
}

module.exports = LoginController;
