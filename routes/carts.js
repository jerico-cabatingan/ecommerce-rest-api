const express = require('express');
const cartsRouter = express.Router();
const dbQuery = require('../controller/carts-queries');
const auth = require('../utils/middleware');

cartsRouter.post('/', auth.checkAuthenticated, dbQuery.createCart);

cartsRouter.post('/:id', auth.checkAuthenticated, dbQuery.addItemById);

cartsRouter.delete('/:id',dbQuery.getCartItemIds, dbQuery.deleteItemById);

cartsRouter.get('/:id', auth.checkAuthenticated, dbQuery.getCartById);

cartsRouter.post('/:id/checkout', auth.checkAuthenticated, dbQuery.getCartTotal, dbQuery.createNewOrder);

module.exports = cartsRouter;