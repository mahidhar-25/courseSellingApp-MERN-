require("dotenv").config();
import { validateAdmin } from "../validation/validation";
import { Admin } from "../db/index";
import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  const token = req.headers.authentication;
  const AdminUser = jwt.verify(token, JWT_SECRET_KEY);

  if (!AdminUser.username) {
    res.status(401).json({
      msg: "your details are not meeting required rules",
    });
  } else {
    req.username = AdminUser.username;
    next();
  }
  // username = req.headers.username;
  // password = req.headers.password;
  // if (validateAdmin(username, password)) {
  //   Admin.findOne({ username, password })
  //     .then((adminUser) => {
  //       if (adminUser) {
  //         next();
  //       } else {
  //         res.status(401).json({
  //           msg: "you are not an admin user",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(500).json({ msg: "Internal server error" });
  //     });
  // } else {
  //   res.status(401).json({
  //     msg: "your details are not meeting required rules",
  //   });
  // }
}

export default adminMiddleware;
