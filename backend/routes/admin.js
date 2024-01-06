require("dotenv").config();
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { validateAdmin, validateCourse } = require("../validation/validation");
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const router = Router();

// Admin Routes

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (validateAdmin(username, password)) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
    res.status(200).json({
      accessToken: token,
    });
  } else {
    res.status(411).json({
      msg: "your login details doesnt met our criteria",
    });
  }
});

router.post("/signup", async (req, res) => {
  console.log("i got request");
  console.log(req.body);
  const obj = {
    username: req.body.username,
    password: req.body.password,
  };
  console.log(obj);
  if (validateAdmin(obj.username, obj.password)) {
    const ExistingUser = await Admin.findOne({
      username: req.body.username,
    });
    if (ExistingUser) {
      res.status(404).json({
        msg: "user with email already exist",
      });
      return;
    }
    await Admin.create(obj);
    res.status(200).json({
      msg: "user details are updated in database",
    });
  } else {
    res.status(411).json({
      msg: "your login details doesnt met our criteria",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const course = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  };

  if (
    validateCourse(course.title, course.description, course.price, course.image)
  ) {
    try {
      const createdCourse = await Course.create(course);
      // Use the createdCourse as the response
      console.log(createdCourse); // Output the created course details or process it as needed
      // Send the createdCourse as a response if necessary
      res.status(201).json(createdCourse); // Send the created course details in the response
    } catch (error) {
      // Handle any potential errors during creation
      console.error(error);
      res.status(500).json({ error: "Failed to create course" });
    }
  }
  // Implement course creation logic
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({
    courses,
  });
});

module.exports = router;
