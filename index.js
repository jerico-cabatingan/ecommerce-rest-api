const express = require('express');
const app = express();

const bodyParser = require("body-parser"); 
app.use(bodyParser.json());

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
