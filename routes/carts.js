const express = require('express');
const cartsRouter = express.Router();
const dbQuery = require('../db/carts-queries');
const auth = require('./middleware');

cartsRouter.post('/',auth.checkAuthenticated, );

cartsRouter.post('/:id', auth.checkAuthenticated, );

cartsRouter.delete('/:id', auth.checkAuthenticated, );

cartsRouter.get('/:id', auth.checkAuthenticated, );

cartsRouter.post('/:id/checkout', auth.checkAuthenticated, );

module.exports = cartsRouter;