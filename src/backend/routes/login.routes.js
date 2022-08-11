const express = require('express');
const LoginController = require('../controllers/loginController');
const { validateEmail, validatePassword } = require('../middlewares/validation.login');

const loginRouter = express.Router();

loginRouter.post('/', validateEmail, validatePassword, LoginController);

module.exports = loginRouter;
