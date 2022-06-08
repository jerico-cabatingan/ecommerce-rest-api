const express = require('express');
const ordersRouter = express.Router();
const dbQuery = require('../db/orders-queries');
const auth = require('./middleware');

ordersRouter.get('/', auth.checkAuthenticated);

ordersRouter.get('/:id', auth.checkAuthenticated);

module.exports = ordersRouter;