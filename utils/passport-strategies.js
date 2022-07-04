require('dotenv').config();
const auth = require('./middleware');
const passport = require('passport');

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback : true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const {
      id, 
      displayName: username, 
      given_name: fname, 
      family_name: lname, 
      email: email,
    } = profile;

    const user = { id,  fname, lname, email, username };

    const isRegistered = await auth.isUserRegistered(id);
    if (isRegistered) {
      return done(null, isRegistered);
    }
    else {
      const newUser = await auth.registerOauthUser(user);
      return done(null, newUser)
    }
  }
));

passport.use(new 
  FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback",
    profileFields: ['id', 'email', 'name']
  },
  async (accessToken, refreshToken, profile, cb) => {

    const {familyName: lname, givenName: fname} = profile.name;
    const email = profile.emails[0].value; 
    const { id } = profile;
    const username = fname + ' ' + lname;
    
    const user = {id, fname, lname, email, username};

    const isRegistered = await auth.isUserRegistered(id);
    if (isRegistered) {
      return cb(null, isRegistered);
    }
    else {
      const newUser = await auth.registerOauthUser(user);
      return cb(null, newUser)
    }
  }
));

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    // returns { id: 'id', email: 'example@email.com', password: 'hashedPw' }
    const user = await auth.authenticateUser({ username, password })
    if (!user || !user.password) {
      return done(null, false);
    }
    return done(null, user);
  } 
  catch (err) {
    return done(err);
  }
}));