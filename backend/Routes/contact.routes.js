const express = require('express');
const listContactsByUserId = require('../src/database/controllers/contacts');

const contactRouter = express.Router();

contactRouter.get('/list-contacts-by-userId/:id', listContactsByUserId);

module.exports = contactRouter;
