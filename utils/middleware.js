const pool = require('../model/config');
const bcrypt = require("bcrypt");

// Protects resources which require authentication 
const checkAuthenticated = (request, response, next) => {
  if (request.isAuthenticated()) {
    next();
  }
  if (!request.isAuthenticated()) {
    console.log('Authorisation required')
    response.redirect(401, '/');
  }
};

// Checks if OAuth2.0 SSO user is already registered
const isUserRegistered = async (id) => {
  const result = await pool.query('SELECT id, username FROM users WHERE id = $1', [id]);
  
  if (result.rows.length === 0) {
      return null;
    }
  return result.rows[0];
};

// Registers via passport.js OAuth2.0 SSO
const registerOauthUser = async (user) => {
  const { id, fname, lname, email, username } = user
    
  const result = await pool.query('INSERT INTO users (id, first_name, last_name, email, username) VALUES ($1, $2, $3, $4, $5);', [id, fname, lname, email, username]);

  if (result) {
    return {id, username}
  }
};

// Configures passport.js local strategy
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
  checkAuthenticated,
  registerOauthUser,
  isUserRegistered,
  authenticateUser
};
