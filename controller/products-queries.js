const pool = require('../model/config');


const getProducts = (request, response) => {
  let category; 
  request.query.category ? category = `%${request.query.category.toLowerCase()}%` : category = '%%';

  let name; 
  request.query.name ? name = `%${request.query.name.toLowerCase()}%` : name = '%%';

  let minPrice; 
  request.query.minPrice ? minPrice = Number(request.query.minPrice) : minPrice = 0;

  let maxPrice; 
  request.query.maxPrice ? maxPrice = Number(request.query.maxPrice) : maxPrice = 1000000;

  let sort; 
  request.query.sort ? sort = request.query.sort.toLowerCase().toString() : sort = 'id';

  let order; 
  request.query.order ? order = request.query.order.toUpperCase().toString() : order = 'ASC';

  pool.query(`SELECT * FROM items WHERE category LIKE $1 AND name LIKE $2 AND price >= cast($3 as money) AND price <= cast($4 as money) ORDER BY ${sort} ${order};`, 
  [category, name, minPrice, maxPrice], 
  (error, results) => {
    if (error) {
      response.status(400).send(error.stack)
    }
    else if (results.rows.length === 0) {
      response.send([])
    }
    else if (results.rows.length > 0 ) {
      response.status(200).json(results.rows);
    }
  })
};

const getCategories = (request, response) => {
  pool.query('SELECT DISTINCT category FROM items;', (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else if (results.rows.length === 0) {
      response.sendStatus(404)
    }
    else if (results.rows.length > 0 ) {
      response.status(200).json(results.rows);
    }
  })
}


const postProduct = (request, response) => {
  const { id, name, category, price } = request.body;

  pool.query('INSERT INTO items (id, name, category, price) VALUES ($1, $2, $3, $4);', [id, name, category, price], (error) => {
    if (error) {
      response.status(400).send(error.detail)
    }
    else {
      response.status(201).send(`Your product was created: 
        id: ${id},
        name: ${name},
        category: ${category},
        price: ${price}`
      )
    }
  })
};


const getProductById = (request, response) => {
  const productId = request.params.id;
  
  pool.query('SELECT * FROM items WHERE id = $1;', [productId], (error, results) => {
    if (error) {
      response.status(400).send(error.detail)
    } 
    else if (results.rows.length === 0 ) {
      response.status(404).send("Item does not exist");
    } 
    else if (results.rows.length > 0) {
      response.status(200).json(results.rows[0]);
    }
  })
};


const deleteProductById = (request, response) => {
  const paramId = request.params.id;
  const result = request.idArray.filter(product => product.id === paramId);

  let productId;
  result.length === 0 ? productId === null : productId = result[0].id;

  pool.query('DELETE FROM items WHERE id = $1;', [productId], (error) => {
    if (error) {
      response.status(400).send(error.detail)
    } 
    else if (productId) {
      response.status(200).send(`Item with ID: ${productId} was removed.`);
    } 
    else if (!productId) {
      response.status(404).send(`Item with ID: ${paramId} not found`)
    }
  })
};


const updateProductById = (request, response) => {
  const { name, category, price } = request.body;
  const paramId = request.params.id;
  const result = request.idArray.filter(product => product.id === paramId);

  let productId;
  result.length === 0 ? productId === null : productId = result[0].id;


  pool.query('UPDATE items SET name = $1, category = $2, price = $3 WHERE id = $4;', [name, category, price, productId], (error) => {
    if (error) {
      response.status(400).send(error.detail)
      throw error
    } 
    else if (productId) {
      response.status(200).send(`Item with ID: ${productId} was updated to:
      name: ${name}
      category: ${category}
      price: ${price}`);
    } 
    else if (!productId) {
      response.status(404).send(`Item with ID: ${paramId} not found`)
    }
  });
};


// middleware for appending ids array to the request object
const getIds = (request, response, next) => {
  pool.query('SELECT id FROM items;', (error, results) => {
    if (error) {
      throw error
    }
    request.idArray = results.rows;
    next();
  })
};

module.exports = {
  getProducts,
  getCategories,
  postProduct,
  getProductById,
  deleteProductById,
  updateProductById,
  getIds
};