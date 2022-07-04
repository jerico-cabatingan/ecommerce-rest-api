const pool = require('../model/config');
const bcrypt = require("bcrypt");
const uuid = require('uuid').v4;

const submitNewUser = async (request, response) => {
  const { fname, lname, email, username, password } = request.body;
  const id = uuid();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
    
  pool.query('INSERT INTO users (id, first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5, $6);', 
    [id, fname, lname, email, username, hashedPassword],
    (error, results) => {
      if (error) {
        response.send(error);
      } else {
        response.status(201).send({ id, username });
      };
  })
};


const getUsers = (request, response) => {
  pool.query('SELECT * FROM users;', (error, results) => {
    if (error) {
      response.send(error.detail)
    }
    response.status(200).send(results.rows);
  })
};


const getUserById = (request, response) => {
  const id = request.params.id
  pool.query('SELECT * FROM users WHERE id = $1;',[id], (error, results) => {
    if (error) {
      response.status(400).send(error.detail)
    } 
    else if (results.rows.length === 0 ) {
      response.status(404).send("User does not exist");
    } 
    else if (results.rows.length > 0) {
      response.status(200).json(results.rows[0]);
    }
  })
};

const updateUser = async (request, response) => {
  const { email, username, password } = request.body; 

  const paramId = request.params.id;
  const result = request.idArray.filter(user => user.id === paramId);

  let userId;
  result.length === 0 ? userId === null : userId = result[0].id;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  pool.query('UPDATE users SET email = $1, username = $2, password = $3 WHERE id = $4;', [email, username, hashedPassword, userId], (error) => {
    if (error) {
      response.status(400).send(error.detail)
    } 
    else if (userId) {
      response.status(200).send(`User with ID: ${userId} was updated to:
      email: ${email}
      username: ${username}
      password: ${hashedPassword}`);
    }
    else if (!userId) {
      response.status(404).send(`User does not exist`)
    };
  })
};

// middleware for appending ids array to the request object
const getIds = (request, response, next) => {
  pool.query('SELECT id FROM users;', (error, results) => {
    if (error) {
      throw error
    }
    request.idArray = results.rows;
    next();
  })
};

module.exports = {
  submitNewUser,
  getUsers,
  getUserById,
  updateUser,
  getIds,
};