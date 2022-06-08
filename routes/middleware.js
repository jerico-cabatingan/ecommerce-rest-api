const checkAuthenticated = (request, response, next) => {
  if (request.isAuthenticated()) {
    next();
  }
  if (!request.isAuthenticated()) {
    console.log('Authorisation required')
    response.redirect(401, '/');
  }
};

module.exports = {
  checkAuthenticated,
};
