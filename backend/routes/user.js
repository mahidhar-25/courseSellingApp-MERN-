const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { validateUser } = require("../validation/validation");
const { User, Course } = require("../db/index");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const obj = {
    username: req.headers.username,
    password: req.headers.password,
  };
  if (validateUser(obj.username, obj.password)) {
    const ExistingUser = await User.findOne({
      username: req.headers.username,
    });
    if (ExistingUser) {
      res.status(404).json({
        msg: "user with email already exist",
      });
      return;
    }
    await User.create(obj);
    res.status(200).json({
      msg: "user details are updated in database",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.status(200).json({
    courses,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const user = await User.findOne({
    username: req.headers.username,
    password: req.headers.password,
  });
  user.purchasesCourses = user.purchasesCourses || [];
  user.purchasesCourses.push(req.params.courseId);

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

router.get("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.status(200).json({
    course,
  });
});

router.post("/purchasedCourses", userMiddleware, async (req, res) => {
  console.log("purchased course");
  // Implement fetching purchased courses logic

  const user = await User.findOne({
    username: req.headers.username,
    password: req.headers.password,
  });
  user.purchasesCourses = user.purchasesCourses || [];
  user.purchasesCourses.push(...req.body);

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.headers.username,
      password: req.headers.password,
    });

    const purchasedCourseIds = await user.purchasesCourses;
    // Fetch all courses where the IDs match the purchasedCourseIds
    const courses = await Course.find({
      _id: { $in: purchasedCourseIds }, // Use $in to match IDs in the purchasedCourseIds array
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
