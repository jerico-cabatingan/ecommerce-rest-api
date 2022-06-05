const express = require('express');
const dbQuery = require('../db/products-queries');
const productsRouter = express.Router();

productsRouter.get('/', dbQuery.getProducts);

productsRouter.post('/', dbQuery.postProduct);

productsRouter.get('/:id', dbQuery.getProductById);

productsRouter.delete('/:id',dbQuery.getIds, dbQuery.deleteProductById);

productsRouter.put('/:id', dbQuery.getIds, dbQuery.updateProductById);

module.exports = productsRouter;