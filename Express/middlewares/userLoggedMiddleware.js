const Users = require("../services/userService");
const cartService = require("../services/cartService");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  res.locals.cartItemCount = 0;

  // Check if there's a user logged in session
  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
    // Get cart item count for logged in user
    res.locals.cartItemCount = cartService.getCartItemCount(
      req.session.userLogged.id
    );
  } else if (req.cookies.email) {
    // If there's a cookie, try to auto-login
    let userFromCookie = Users.findByField("email", req.cookies.email);
    if (userFromCookie) {
      // Remove password for session
      delete userFromCookie.password;
      req.session.userLogged = userFromCookie;
      res.locals.isLogged = true;
      res.locals.userLogged = userFromCookie;
      // Get cart item count for logged in user
      res.locals.cartItemCount = cartService.getCartItemCount(
        userFromCookie.id
      );
    }
  }

  next();
}

module.exports = userLoggedMiddleware;
