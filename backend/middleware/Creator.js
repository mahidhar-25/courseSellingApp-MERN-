require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Middleware for handling auth
function creatorMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization;
    const isValidToken = jwt.verify(token, JWT_SECRET_KEY);
    if (isValidToken) {
      req.body.username = isValidToken;
      next();
    }
  } catch (e) {
    res.status(404).json({
      msg: "Invalid token",
    });
  }
}

module.exports = creatorMiddleware;
