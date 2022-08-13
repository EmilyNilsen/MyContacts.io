const userService = require('../services/userService');

const UserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await userService.creteNewUser({ email, password });
    if (!response) return res.status(400).json({ message: 'E-mail já cadastrado'})
    return res.status(201).end();
  } catch(e) {
    console.error(e);
  }
}

module.exports = UserController;
