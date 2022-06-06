const express = require('express');
const dbQuery = require('../db/users-queries');
const usersRouter = express.Router();

usersRouter.post('/register', dbQuery.submitNewUser);

module.exports = usersRouter;