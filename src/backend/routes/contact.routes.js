const express = require('express');
const { listContactsByUserId, creteNewContact, updateContact, deleteContact }  = require('../controllers/contactController');
const { validatePhone, validateName, validateEmailIsInUseByOtherContact } = require('../middlewares/validation.contacts');
const validateToken = require('../middlewares/validate.jwt');

const contactRouter = express.Router();

contactRouter.get('/list-contacts', validateToken, listContactsByUserId);
contactRouter.post('/register', validateToken, validateName, validatePhone, validateEmailIsInUseByOtherContact, creteNewContact);
contactRouter.put('/update', validateToken, validateName, validatePhone, validateEmailIsInUseByOtherContact, updateContact);
contactRouter.delete('/:id', validateToken, deleteContact);

module.exports = contactRouter;
