const { param } = require('../routes/products');
const config = require('./config')
const Pool = require('pg').Pool
const pool = new Pool(config);
const uuid = require('uuid').v4;


const createCart = (request, response) => {
  const user_id = request.user;
  const cart_id = uuid();

  pool.query('INSERT INTO carts (id, user_id) VALUES ($1, $2);', [cart_id, user_id], (error) => {
    if (error) {
      response.status(400).send(error.detail)
    }
    else {
      response.status(201).send(`Cart created. \nid: ${cart_id} \nuser_id: ${user_id}`)
    }
  })
};

const addItemById = (request, response) => {
  const item_id = request.body.id
  const cart_id = request.params.id

  pool.query('INSERT INTO cart_items (item_id, cart_id) VALUES ($1, $2);',[item_id, cart_id] ,(error, results) => {
    if (error) {
      response.status(400).send(error.detail)
    }
    else {
      response.status(201).send(`Item with id: ${item_id} \nwas added to cart with id: ${cart_id}`)
    }
  })
};

const deleteItemById = (request, response) => {
  const reqId = request.body.id
  const cart_id = request.params.id;

  const result = request.cartItemIds.filter(item => item.item_id === reqId)

  let itemToDelete;
  result.length === 0 ? itemToDelete === null : itemToDelete = result[0].item_id;

  pool.query('DELETE FROM cart_items WHERE item_id = $1 AND cart_id = $2;', [itemToDelete, cart_id], (error, results) => {
    if (error) {
      response.status(400).send(error.detail)
    }
    else if (itemToDelete) {
      response.status(200).send(`Item with id: ${itemToDelete} \nwas removed from cart with id: ${cart_id}`)
    }
    else if (!itemToDelete) {
      response.status(404).send(`Item with ID: ${reqId} \nis not in cart with id: ${cart_id}`)
    }
  })
};

const getCartById = (request, response) => {
  const cart_id = request.params.id;

  pool.query('SELECT * FROM items JOIN cart_items ON items.id = cart_items.item_id WHERE cart_items.cart_id = $1;', [cart_id], (error, results) => {
    if (error) {
      response.status(400).send(error.detail)
    }
    else if (results.rows.length === 0) {
      response.status(404).send('Cart not found.');
    }
    else {
      response.status(200).send(results.rows);
    }
  })
};

const createNewOrder = (request, response) => {
  pool.query('{DATABASE QUERY}', (error, results) => {

  })
};

// Supplys DELETE /cart/:id with array: [ {item_id: 'id'}... ] inside the request object.
const getCartItemIds = (request, response, next) => {
  const cart_id = request.params.id;

  pool.query('SELECT item_id FROM cart_items WHERE cart_id = $1', [cart_id], (error, results) => {
    if (error) {
      console.log(error.detail);
    }
    request.cartItemIds = results.rows;
    next();
  })
}

module.exports = {
  createCart,
  addItemById,
  deleteItemById,
  getCartById,
  createNewOrder,
  getCartItemIds
}