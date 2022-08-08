const express = require('express');
const cors = require('cors');
const routerIndex = require('./Routes/index.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(routerIndex);

module.exports = app;
