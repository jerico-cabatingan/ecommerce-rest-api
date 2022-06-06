const checkAuthenticated = (request, response, next) => {
  console.log('Authenticated: ' + request.isAuthenticated())
  if (request.isAuthenticated()) {
    next();
  }
  if (!request.isAuthenticated()) {
    response.redirect('/');
  }
};

module.exports = {
  checkAuthenticated,
};
