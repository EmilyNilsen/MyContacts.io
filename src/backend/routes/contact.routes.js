const express = require('express');
const { listContactsByUserId, creteNewContact, updateContact, deleteContact }  = require('../controllers/contactController');
const { validateEmail } = require('../middlewares/validation.login');
const { validateTelefone } = require('../middlewares/validation.contacts');
const validateToken = require('../middlewares/validate.jwt');

const contactRouter = express.Router();

contactRouter.get('/list-contacts', validateToken, listContactsByUserId);
contactRouter.post('/register', validateToken, validateTelefone, validateEmail, creteNewContact);
contactRouter.put('/update', validateToken, validateTelefone, validateEmail, updateContact);
contactRouter.delete('/:id', validateToken, deleteContact);

module.exports = contactRouter;
