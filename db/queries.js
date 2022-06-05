const Pool = require('pg').Pool
const pool = new Pool({
	user: "me",
	password: "password",
	database: "ecommerce-db",
	host: "localhost",
	port: "5432",
});

//////////////////// USERS QUERIES /////////////////////////

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC;', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//////////////////// PRODUCT QUERIES /////////////////////////

const getProducts = (request, response, next) => {
  pool.query('SELECT * FROM items', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

// product counter helper function for creating new product IDs
const productCounter = (request, response, next) => {
  pool.query('SELECT COUNT(*) FROM items', (error, results) => {
    if (error) {
      throw error
    }
    const rowCount = results.rows[0].count;
    request.rowCount = parseInt(totalUsers);
    console.log(request.rowCount);
    next();
  })
}

module.exports = {
  getUsers,
  productCounter,
  getProducts
}

