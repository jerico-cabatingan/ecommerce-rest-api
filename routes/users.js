const express = require('express');
const usersRouter = express.Router();
const dbQuery = require('../controller/users-queries');
const auth = require('../utils/middleware');

usersRouter.post('/register', dbQuery.submitNewUser);

usersRouter.get('/', dbQuery.getUsers);

// usersRouter.get('/active', (request, response) => {
//   response.send(request.session.passport.user);
// });

usersRouter.get('/:id', auth.checkAuthenticated, dbQuery.getUserById);

usersRouter.put('/:id', auth.checkAuthenticated, dbQuery.getIds, dbQuery.updateUser);

module.exports = usersRouter;