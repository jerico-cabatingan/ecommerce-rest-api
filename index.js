// Create s an express server
const express = require('express');
const app = express();

// Give server access to .env variables
require('dotenv').config();

// Allow json objects to be parsed from the request body
const bodyParser = require("body-parser"); 
app.use(bodyParser.json());

// Allow cross origin resource sharing
const cors = require('cors');
app.use(cors())

// Configure sessions
const session = require('express-session');
const store = new session.MemoryStore();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { 
      maxAge: 1000 * 60 *60 * 24, 
      secure: true, 
      sameSite: "none" 
    },
    resave: false,
    saveUninitialized: false,
    store
  })
);

// Configure local log-in strategy
const usersQuery = require('./db/users-queries');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    // returns { id: 'id', username: 'example', password: 'hashedPw' }
    const user = await usersQuery.authenticateUser({ username, password })
    if (!user || !user.password) {
      return done(null, false);
    }
    return done(null, user);
  } 
  catch (err) {
    return done(err);
  }
}));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

// EXPRESS ROUTERS //

const productsRouter = require('./routes/products');
app.use('/products', productsRouter)

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// SWAGGER CONFIG //
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, './openapi.yaml'), 'utf8'));

// Return Swagger UI documentation to /api-docs url
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { 
  console.log(`Server is listening on port: ${PORT}`)
})
