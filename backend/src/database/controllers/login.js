const userService = require('../services/login');

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  const response = await userService.authentication({ email, password });
  if (!response) return res.status(404).json({ message: 'Usuário não encontrado'})
  return res.status(200).json(response);
}

module.exports = LoginController;
