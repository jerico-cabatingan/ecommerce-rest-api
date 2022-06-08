const config = require('./config')
const Pool = require('pg').Pool
const pool = new Pool(config);

const getOrders = (request, response) => {
  pool.query('SELECT * FROM orders;', (error, results) => {
    if (error) {
      response.status(400).send(error.detail)
    }
    response.status(200).json(results.rows);
  })
};

const getOrderById = (request, response) => {
  const orderId = request.params.id;

  pool.query('SELECT * FROM orders WHERE id = $1;', [orderId], (error, results) => {
    if (error) {
      response.status(400).send(error.detail)
    }
    response.status(200).json(results.rows);
  })
};

module.exports = {
  getOrderById,
  getOrders
};