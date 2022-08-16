const userService = require('../services/userService');
const defaultApiReturn = require('../utils/defaultApiReturn');

const UserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await userService.creteNewUser({ email, password });
    if (!response) return res.status(400).json(defaultApiReturn({ error: { message: 'E-mail já cadastrado'} }));
    return res.status(201).json(defaultApiReturn({}));
  } catch(e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

module.exports = UserController;
