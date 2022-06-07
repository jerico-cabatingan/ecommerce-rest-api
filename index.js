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

// Configuring Sessions
const session = require('express-session');
const store = new session.MemoryStore();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { 
      maxAge: 1000 * 60 *60 * 24, 
      sameSite: "none" 
    },
    resave: false,
    saveUninitialized: false,
    store
  })
);

// Configuring Passport.js local strategy
const usersQuery = require('./db/users-queries');
const auth = require('./routes/middleware')
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('Serialising...')
  done(null, user)
});
passport.deserializeUser((user, done) => {
  console.log('Deserialising...')
  done(null, user.id);
});

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
  response.send('Welcome to my Node.js, Express, and Postgres API app. Please authenticate to proceed.')
}); 

// AUTHENTICATION //

app.post('/login', 
  passport.authenticate('local', 
  {failureRedirect: '/'}), (request, response) => {

    console.log(`\n\nrequest.session.passport: ${JSON.stringify(request.session.passport)}`)

    console.log(`request.user: ${JSON.stringify(request.user)}\n\n`)

    response.redirect('/profile');
  }
);

app.get('/profile', auth.checkAuthenticated, (request, response) => {
  response.send(`You are logged in as \n\n id: ${request.user} \n username: ${request.session.passport.user.username}`);
}); 

app.get('/logout', (request, response) => {
  request.logout((err) => {
    if (err) {
      return next(err); 
    }
    response.redirect('/');
  });
});

// EXPRESS ROUTERS //

const productsRouter = require('./routes/products');
app.use('/products', productsRouter)

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const cartsRouter = require('./routes/carts');
app.use('/carts', cartsRouter);

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

// TO DO LIST
// update swagger docs
// finish orders cart and checkout endpoints
