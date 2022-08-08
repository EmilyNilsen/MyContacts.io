const { Router } = require('express');
const loginRouter = require('./login.routes');

const routerIndex = Router();
routerIndex.use('/login', loginRouter);

module.exports = routerIndex;
