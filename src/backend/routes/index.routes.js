const { Router } = require('express');
const loginRouter = require('./login.routes');
const contactsRouter = require('./contact.routes');

const routerIndex = Router();
routerIndex.use('/login', loginRouter);
routerIndex.use('/contacts', contactsRouter);

module.exports = routerIndex;
