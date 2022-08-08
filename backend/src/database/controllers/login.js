const userService = require('../services/login');

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  const response = await userService.login({ email, password });
  if (!response) return res.status(404).json({ message: 'User not found'})
  return res.status(200).json({ message: 'Login feito com sucesso!'})
}

module.exports = LoginController;
