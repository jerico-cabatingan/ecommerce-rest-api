require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();
const passport = require('passport');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allow cross origin resource sharing
app.use(cors({
  origin: "http://localhost:3000",
  method: ['GET', 'POST'],
  credentials: true
}));

const store = new session.MemoryStore();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { 
      maxAge: 1000 * 60 * 60 * 24, 
      sameSite: "none" 
    },
    resave: false,
    saveUninitialized: false,
    store
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (request, response) => {
  response.send('Welcome to my Node.js, Express, and Postgres API app. Please authenticate to proceed.')
});

// EXPRESS ROUTERS //

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const productsRouter = require('./routes/products');
app.use('/products', productsRouter)

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const cartsRouter = require('./routes/carts');
app.use('/carts', cartsRouter);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);



// SWAGGER CONFIG //
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const { urlencoded } = require('body-parser');
const { resourceLimits } = require('worker_threads');
const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, './openapi.yaml'), 'utf8'));

// Return Swagger UI documentation to /api-docs url
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { 
  console.log(`Server is listening on port: ${PORT}`)
})

// TO DO LIST
// update swagger docs
// finish orders cart and checkout endpoints
