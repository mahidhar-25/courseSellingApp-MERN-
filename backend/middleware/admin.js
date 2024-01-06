const { validateAdmin } = require("../validation/validation");
const { Admin } = require("../db/index");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  username = req.body.username;
  password = req.body.password;
  if (validateAdmin(username, password)) {
    Admin.findOne({ username, password })
      .then((adminUser) => {
        if (adminUser) {
          next();
        } else {
          res.status(401).json({
            msg: "you are not an admin user",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
      });
  } else {
    res.status(401).json({
      msg: "your details are not meeting required rules",
    });
  }
}

module.exports = adminMiddleware;
