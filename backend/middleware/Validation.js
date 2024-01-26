const { validateLoginDetails } = require("../validation/validation");

// Middleware for handling auth
function validationMiddleware(req, res, next) {
  username = req.body.username;
  password = req.body.password;
  if (validateLoginDetails(username, password)) {
    next();
  } else {
    res.status(401).json({
      msg: "your details are not meeting required rules",
    });
  }
}

module.exports = validationMiddleware;
