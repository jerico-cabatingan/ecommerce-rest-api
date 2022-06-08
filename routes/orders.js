const express = require('express');
const ordersRouter = express.Router();
const dbQuery = require('../db/orders-queries');
const auth = require('./middleware');

ordersRouter.get('/', auth.checkAuthenticated, dbQuery.getOrders);

ordersRouter.get('/:id', auth.checkAuthenticated, dbQuery.getOrderById);

module.exports = ordersRouter;
