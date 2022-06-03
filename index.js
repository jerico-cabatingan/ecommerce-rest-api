const express = require('express');
const app = express();
const dbQuery = require("./db/queries");

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', dbQuery.getUsers);

const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const res = require('express/lib/response');
const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, './openapi.yaml'), 'utf8'));

// Return Swagger UI documentation to /api-docs url
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { 
  console.log(`Server is listening on port: ${PORT}`)
})
