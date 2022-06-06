const express = require('express');
const usersRouter = express.Router();
const dbQuery = require('../db/users-queries');
const auth = require('./middleware');

usersRouter.post('/register', dbQuery.submitNewUser);

usersRouter.get('/', dbQuery.getUsers);

usersRouter.get('/:id', auth.checkAuthenticated, dbQuery.getUserById);

usersRouter.put('/:id', auth.checkAuthenticated, dbQuery.getIds ,dbQuery.updateUser);

module.exports = usersRouter;