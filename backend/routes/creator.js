require("dotenv").config();
const { Router } = require("express");
const creatorMiddleware = require("../middleware/Creator");
const validationMiddleware = require("../middleware/Validation");
const validateCourseMiddleware = require("../middleware/CourseValidation");
const { Creator, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const router = Router();

// Admin Routes

router.post("/signin", validationMiddleware, async (req, res) => {
  const ExistingUser = await Creator.findOne({
    username: req.body.username,
  });

  if (!ExistingUser) {
    res.status(411).json({
      msg: "your are not in our database",
    });
    return;
  }

  const token = jwt.sign(req.body.username, process.env.JWT_SECRET_KEY);
  res.status(200).json({
    accessToken: token,
  });
});

router.post("/signup", validationMiddleware, async (req, res) => {
  const ExistingUser = await Creator.findOne({
    username: req.body.username,
  });

  if (ExistingUser) {
    res.status(404).json({
      msg: "user with email already exist",
    });
    return;
  }

  await Creator.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.status(200).json({
    msg: "user details are updated in database",
  });
});

router.post(
  "/createCourse",
  validateCourseMiddleware,
  creatorMiddleware,
  async (req, res) => {
    try {
      const createdCourse = await Course.create({
        ...req.body.course,
        creatorUsername: req.body.username,
      });
      const creator = await Creator.findOne({
        username: req.body.username,
      });

      creator.createdCourses = creator.createdCourses || [];
      creator.createdCourses.push(createdCourse._id);

      await creator.save();
      res.status(201).json(createdCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create course" });
    }
  }
);

router.get("/courses", creatorMiddleware, async (req, res) => {
  console.log("auth acessed");
  const courses = await Course.find({});
  res.status(200).json(courses);
});

router.get("createdCourses", creatorMiddleware, async (req, res) => {
  const creator = await Creator.findOne({
    username: req.body.username,
  });
  const createdCourses = creator.createdCourses;

  res.status(200).json({
    createdCourses,
  });
});

router.get("purchasedCourses", creatorMiddleware, async (req, res) => {
  const creator = await Creator.findOne({
    username: req.body.username,
  });
  const purchasedCourses = creator.purchasedCourses;

  res.status(200).json({
    purchasedCourses,
  });
});

router.post("/buyCourses/:courseId", creatorMiddleware, async (req, res) => {
  const creator = await Creator.findOne({
    username: req.body.username,
  });

  const course = await Course.findById(req.params.courseId);

  creator.purchasedCourses = creator.purchasedCourses || [];
  creator.purchasedCourses.push(req.params.courseId);

  const updatedCreator = await creator.save();

  course.details.noOfPeoplePurchased += 1;

  await course.save();

  res.status(200).json(updatedCreator.purchasedCourses);
});

router.post("/rateCourses/:courseId", creatorMiddleware, async (req, res) => {
  const creator = await Creator.findOne({
    username: req.body.username,
  });

  const course = await Course.findById(req.params.courseId);

  creator.purchasedCourses = creator.purchasedCourses || [];
  creator.purchasedCourses.forEach((obj) => {
    console.log(obj._id);
    if (obj._id.toString() === req.params.courseId) {
      obj.rating = req.body.rating;
    }
  });

  const updatedCreator = await creator.save();

  const peopleRated = course.details.noOfPeopleRated;
  course.details.rating =
    (course.details.rating * peopleRated + req.body.rating) / (peopleRated + 1);
  course.details.noOfPeopleRated += 1;
  await course.save();

  res.status(200).json(updatedCreator.purchasedCourses);
});

router.get("/courses/:courseId", creatorMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.status(200).json({
    course,
  });
});

module.exports = router;
