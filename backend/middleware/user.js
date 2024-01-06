require("dotenv").config();
import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// const { validateUser } = require("../validation/validation");
// const { User } = require("../db/index");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const token = req.headers.authentication;
  const user = jwt.verify(token, JWT_SECRET_KEY);

  if (!user.username) {
    res.status(401).json({
      msg: "your token is not valid",
    });
  } else {
    req.username = user.username;
    next();
  }
  // username = req.headers.username;
  // password = req.headers.password;

  // if (validateUser(username, password)) {
  //   const normalUser = User.findOne({ username, password });
  //   if (normalUser) {
  //     next();
  //   } else {
  //     res.status(401).json({
  //       msg: "you are not an user in our database",
  //     });
  //   }
  // } else {
  //   res.status(401).json({
  //     msg: "your details are not me required rules",
  //   });
  // }
}

module.exports = userMiddleware;
