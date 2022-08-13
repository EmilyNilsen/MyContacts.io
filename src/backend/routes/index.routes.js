const { Router } = require('express');
const contactsRouter = require('./contact.routes');
const userRouter = require('./user.routes');

const routerIndex = Router();
routerIndex.use('/contacts', contactsRouter);
routerIndex.use('/user', userRouter)

module.exports = routerIndex;
