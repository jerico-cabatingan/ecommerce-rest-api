const checkAuthenticated = (request, response, next) => {
  console.log(`Authenticated: ${request.isAuthenticated()}`);
  console.log(request);
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
