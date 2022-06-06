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
        response.status(400).send('Username or email is already taken');
        throw error
      }
      response.status(201).send(`New user: ${username} created.`)
  })
};

module.exports = {
  submitNewUser,
};
