const express = require('express');
const { listContactsByUserId, cretedNewContact }  = require('../src/database/controllers/contacts');
const { validateEmail } = require('../src/database/middlewares/validation.login');
const { validateTelefone } = require('../src/database/middlewares/validation.contacts');

const contactRouter = express.Router();

contactRouter.get('/list-contacts-by-userId/:id', listContactsByUserId);
contactRouter.post('/register', validateTelefone, validateEmail, cretedNewContact);

module.exports = contactRouter;
