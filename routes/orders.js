const express = require('express');
const ordersRouter = express.Router();
const dbQuery = require('../controller/orders-queries');
const auth = require('../utils/middleware');

ordersRouter.get('/', 
  auth.checkAuthenticated, 
  dbQuery.getOrders
);

ordersRouter.get('/:id', 
  auth.checkAuthenticated, 
  dbQuery.getOrderById
);

ordersRouter.get('/user/:userId', 
  auth.checkAuthenticated, 
  dbQuery.getOrdersByUserId
);

module.exports = ordersRouter;
