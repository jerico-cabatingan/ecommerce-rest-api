const config = require('./config')
const uuid = require('uuid').v4;
const bcrypt = require("bcrypt");
const Pool = require('pg').Pool
const pool = new Pool(config);


const submitNewUser = async (request, response) => {
  const { email, username, password } = request.body;
  const id = uuid();

  // Generate salt and hash the password 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
    
  pool.query('INSERT INTO users (id, email, username, password) VALUES ($1, $2, $3, $4);', 
    [id, email, username, hashedPassword],
    (error, results) => {
      if (error) {
        response.status(400).send(error.detail)
      }
      response.status(201).send(`New user: "${username}" created.`)
  })
};


const getUsers = (request, response) => {
  pool.query('SELECT * FROM users;', (error, results) => {
    if (error) {
      response.status(400).send(error.detail)
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
  const { username, email, password } = request.body; 

  const paramId = request.params.id;
  const result = request.idArray.filter(user => user.id === paramId);

  let userId;
  result.length === 0 ? userId === null : userId = result[0].id;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  pool.query('UPDATE users SET email = $1, username = $2, password = $3 WHERE id = $4;', [username, email, hashedPassword, userId], (error) => {
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

// used in configuring passport.js local strategy
const authenticateUser = async (userData) => {
  const { username, password } = userData;
  try {
    const result = await pool.query('SELECT id, username, password FROM users WHERE username = $1', [username]);

    const { id, username: user, password: hashedPassword } = result.rows[0];

    const matchedPassword = await bcrypt.compare(password, hashedPassword);

    if (!matchedPassword) {
      console.log('Your password was incorrect');
      return {id, username: user, password: matchedPassword};
    }
    return {id, username: user, password: hashedPassword}
  }
  catch (err) {
    console.log('Username does not exist!');
    return err;
  }
}

module.exports = {
  submitNewUser,
  getUsers,
  getUserById,
  updateUser,
  getIds,
  authenticateUser,
};