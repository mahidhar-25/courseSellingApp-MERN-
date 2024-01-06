const { Router } = require("express");
const adminMiddleware = require("../middleware/admin").default;
const { validateAdmin, validateCourse } = require("../validation/validation");
const { Admin, Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  const obj = {
    username: req.headers.username,
    password: req.headers.password,
  };
  if (validateAdmin(obj.username, obj.password)) {
    const ExistingUser = await Admin.findOne({
      username: req.headers.username,
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
  }
  // Implement admin signup logic
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
