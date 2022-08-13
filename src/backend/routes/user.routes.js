const express = require('express');
const UserController = require('../controllers/userController');
const LoginController = require('../controllers/loginController');
const { validateEmail, validatePassword } = require('../middlewares/validation.login');

const userRouter = express.Router();

userRouter.post('/register', validateEmail, validatePassword, UserController);
userRouter.post('/login', validateEmail, validatePassword, LoginController)

module.exports = userRouter;
