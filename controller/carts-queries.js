const pool = require('../model/config');
const uuid = require('uuid').v4;


const createCart = (request, response) => {
  const cartId = uuid();
  const userId = request.session.passport.user.id;
  const today = new Date().toUTCString();
 
  pool.query('INSERT INTO carts (id, user_id, timestamp) VALUES ($1, $2, $3);', [cartId, userId, today], (error) => {
    if (error) {
      response.status(400).send(error)
    }
    else {
      response.status(201).send(`Cart created. \nid: ${cartId} \nuser_id: ${userId}`)
    }
  })
};

const addItemById = (request, response) => {
  const itemId = request.body.id
  const cartId = request.params.id

  pool.query('INSERT INTO cart_items (item_id, cart_id) VALUES ($1, $2);', [itemId, cartId],(error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else {
      response.status(201).send(`Item with id: ${itemId} \nwas added to cart with id: ${cartId}`)
    }
  })
};

const deleteItemById = (request, response) => {
  const reqId = request.body.id
  const cartId = request.params.id;

  const result = request.cartItemIds.filter(item => item.item_id === reqId)

  let itemToDelete;
  result.length === 0 ? itemToDelete === null : itemToDelete = result[0].item_id;

  pool.query('DELETE FROM cart_items WHERE item_id = $1 AND cart_id = $2;', [itemToDelete, cartId], (error, results) => {
    if (error) {
      response.status(400).send(error.detail)
    }
    else if (itemToDelete) {
      response.status(200).send(`Item with id: ${itemToDelete} \nwas removed from cart with id: ${cartId}`)
    }
    else if (!itemToDelete) {
      response.status(404).send(`Item with ID: ${reqId} \nis not in cart with id: ${cartId}`)
    }
  })
};

const getCartById = (request, response) => {
  const cartId = request.params.id;

  pool.query('SELECT * FROM items JOIN cart_items ON items.id = cart_items.item_id WHERE cart_items.cart_id = $1;', [cartId], (error, results) => {
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
  const id = uuid();
  const userId = request.session.passport.user.id;
  const cartId = request.params.id;
  const totalPrice = request.cartTotal;

  pool.query('INSERT INTO orders (id, user_id, cart_id, total_price) VALUES ($1, $2, $3, $4);', [id, userId, cartId, totalPrice], (error, results) => {
    if (error) {
      response.status(200).send(error);
    }
    response.status(201).send(`You have been charged a total of ${totalPrice}`);
  })
};

// Supplys DELETE /cart/:id with array: [ {item_id: 'id'}... ] inside the request object
const getCartItemIds = (request, response, next) => {
  const cartId = request.params.id;

  pool.query('SELECT item_id FROM cart_items WHERE cart_id = $1', [cartId], (error, results) => {
    if (error) {
      console.log(error);
    }
    request.cartItemIds = results.rows;
    next();
  })
};

// This middleware supplys carts total price to POST /order/:id/checkout
const getCartTotal = (request, response, next) => {
  const cartId = request.params.id;

  pool.query('SELECT SUM(price) FROM items JOIN cart_items ON items.id = cart_items.item_id WHERE cart_items.cart_id = $1;', [cartId], (error, results) => {
    if (error) {
      console.log(error);
    }
    request.cartTotal = results.rows[0].sum;
    next();
  })
};

// This middleware updated the carts checkout status to true after an order has been placed
const setCartCheckout = (request, response, next) => {
  const cartId = request.params.id;

  pool.query('UPDATE carts SET is_checked_out = true WHERE id = $1;', [cartId], (error, results) => {
    if (error) {
      console.log(error);
    }
    next();
  })
};

// This retrieves a users most recent cart for stoarge in session memory on the front end
const getLastActiveCart = (request, response, next) => {
  const userId = request.params.userId;
  console.log(request.isAuthenticated());

  pool.query('SELECT * FROM carts WHERE user_id = $1 AND is_checked_out = false ORDER BY timestamp DESC LIMIT 1;', [userId], (error, results) => {
    if (error) {
      response.send(error)
      console.log(error)
    } else if (results.length === 0) {
      response.status(404).send('No active carts')
    }
    response.status(200).send(results.rows[0].id)
  });
}

module.exports = {
  createCart,
  addItemById,
  deleteItemById,
  getCartById,
  setCartCheckout,
  createNewOrder,
  getLastActiveCart,
  getCartItemIds,
  getCartTotal
}