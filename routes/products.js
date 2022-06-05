const express = require('express');
const dbQuery = require('../db/queries');
const productsRouter = express.Router();

productsRouter.get('/', dbQuery.getProducts);

productsRouter.post('/', (req, res , next) => {

});

productsRouter.get('/{id}', (req, res , next) => {

});

productsRouter.delete('/{id}', (req, res , next) => {

});


productsRouter.put('/{id}', (req, res , next) => {

});

module.exports = productsRouter;