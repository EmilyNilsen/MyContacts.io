const express = require('express');
const { listContactsByUserId, creteNewContact, updateContact, deleteContact }  = require('../controllers/contactController');
const { validateEmail } = require('../middlewares/validation.login');
const { validatePhone, validateName } = require('../middlewares/validation.contacts');
const validateToken = require('../middlewares/validate.jwt');

const contactRouter = express.Router();

contactRouter.get('/list-contacts', validateToken, listContactsByUserId);
contactRouter.post('/register', validateToken, validateName, validatePhone, validateEmail, creteNewContact);
contactRouter.put('/update', validateToken, validateName, validatePhone, validateEmail, updateContact);
contactRouter.delete('/:id', validateToken, deleteContact);

module.exports = contactRouter;
