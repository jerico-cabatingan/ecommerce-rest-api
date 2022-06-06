const express = require('express');
const dbQuery = require('../db/users-queries');
const usersRouter = express.Router();

usersRouter.post('/register', dbQuery.submitNewUser);

usersRouter.get('/', dbQuery.getUsers);

usersRouter.get('/:id', dbQuery.getUserById);

usersRouter.put('/:id',dbQuery.getIds ,dbQuery.updateUser);

module.exports = usersRouter;