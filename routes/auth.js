const express = require('express');
const authRouter = express.Router();

// Configuring Sessions
const session = require('express-session');
const store = new session.MemoryStore();

authRouter.use(
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

require('../utils/passport-strategies');
const passport = require('passport');
authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.post('/login', 
  passport.authenticate('local'), 
  (request, response) => {
    console.log(`Authenticated: ${request.isAuthenticated()}`)
    response.send(JSON.stringify(request.session.passport.user));
  }
);

authRouter.get('/google', 
  passport.authenticate('google', { scope: ['email', 'profile']})
);

authRouter.get('/google/callback', 
  passport.authenticate('google', { 
    successRedirect: 'http://localhost:3000/products', 
    failureRedirect: 'http://localhost:3000/login'
  })
);

authRouter.get('/facebook',
  passport.authenticate( 'facebook', { scope: ['email']} ));

authRouter.get('/facebook/callback',
  passport.authenticate('facebook', { 
    successRedirect: 'http://localhost:3000/products', 
    failureRedirect: 'http://localhost:3000/login'
  })
);

authRouter.get('/logout', (request, response) => {
  request.logout((err) => {
    if (err) {
      return next(err); 
    }
    console.log('Authenticated: ' + request.isAuthenticated())
    response.redirect('/');
  });
});

module.exports = authRouter;