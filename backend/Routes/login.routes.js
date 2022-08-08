const express = require('express');
const LoginController = require('../src/database/controllers/login');
const { validateEmail, validatePassword } = require('../src/database/middlewares/validation.login');

const loginRouter = express.Router();

loginRouter.post('/', validateEmail, validatePassword, LoginController);

module.exports = loginRouter;
