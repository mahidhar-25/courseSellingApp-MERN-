const { validateCourse } = require("../validation/validation");

// Middleware for handling auth
function validateCourseMiddleware(req, res, next) {
  const course = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    details: req.body.details ? req.body.details : {},
  };

  console.log(course);

  if (
    validateCourse(course.title, course.description, course.price, course.image)
  ) {
    req.body.course = course;
    next();
  } else {
    res.status(401).json({
      msg: "your details are not meeting required rules",
    });
  }
}

module.exports = validateCourseMiddleware;
