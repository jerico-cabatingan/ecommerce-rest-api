const config = require('./config')
const Pool = require('pg').Pool
const pool = new Pool(config);


const createCart = (request, response) => {
  pool.query('{DATABASE QUERY}', (error, results) => {
  
  })
};

const addItembyId = (request, response) => {
  pool.query('{DATABASE QUERY}', (error, results) => {
  
  })
};

const deleteItemById = (request, response) => {
  pool.query('{DATABASE QUERY}', (error, results) => {
  
  })
};

const getCartById = (request, response) => {
  pool.query('{DATABASE QUERY}', (error, results) => {
  
  })
};

const createNewOrder = (request, response) => {
  pool.query('{DATABASE QUERY}', (error, results) => {
  
  })
};

module.exports = {
  createCart,
  addItembyId,
  deleteItemById,
  getCartById,
  createNewOrder
}