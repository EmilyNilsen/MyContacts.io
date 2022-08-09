const express = require('express');
const { listContactsByUserId, creteNewContact }  = require('../src/database/controllers/contacts');
const { validateEmail } = require('../src/database/middlewares/validation.login');
const { validateTelefone } = require('../src/database/middlewares/validation.contacts');
const validateToken = require('../src/database/middlewares/validate.jwt');

const contactRouter = express.Router();

contactRouter.get('/list-contacts-by-userId/:id', validateToken, listContactsByUserId);
contactRouter.post('/register', validateToken, validateTelefone, validateEmail, creteNewContact);

module.exports = contactRouter;
