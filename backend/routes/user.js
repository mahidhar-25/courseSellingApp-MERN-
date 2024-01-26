require("dotenv").config();
const { Router } = require("express");
const router = Router();
const validationMiddleware = require("../middleware/Validation");
const { User, Course, Question } = require("../db/index");
const jwt = require("jsonwebtoken");
const creatorMiddleware = require("../middleware/Creator");

router.post("/signin", validationMiddleware, async (req, res) => {
  const ExistingUser = await User.findOne({
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
// User Routes
router.post("/signup", validationMiddleware, async (req, res) => {
  const ExistingUser = await User.findOne({
    username: req.body.username,
  });

  if (ExistingUser) {
    res.status(404).json({
      msg: "user with email already exist",
    });
    return;
  }

  await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  res.status(200).json({
    msg: "user details are updated in database",
  });
});

router.get("/courses", creatorMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.status(200).json({
    courses,
  });
});

router.post("/buyCourses/:courseId", creatorMiddleware, async (req, res) => {
  // Implement course purchase logic
  const user = await User.findOne({
    username: req.body.username,
  });
  const course = await Course.findById(req.params.courseId);
  user.purchasedCourses = user.purchasedCourses || [];
  user.purchasedCourses.push(req.params.courseId);

  const updatedUser = await user.save();
  course.details.noOfPeoplePurchased += 1;
  res.status(200).json(updatedUser.purchasedCourses);
});

router.get("/courses/:courseId", creatorMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.status(200).json({
    course,
  });
});

router.post("/rateCourses/:courseId", creatorMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  const course = await Course.findById(req.params.courseId);

  user.purchasedCourses = user.purchasedCourses || [];
  user.purchasedCourses.forEach((obj) => {
    if (obj._id.toString() === req.params.courseId) {
      obj.rating = req.body.rating;
    }
  });

  const updatedUser = await user.save();

  const peopleRated = course.details.noOfPeopleRated;
  course.details.rating =
    (course.details.rating * peopleRated + req.body.rating) / (peopleRated + 1);
  course.details.noOfPeopleRated += 1;
  await course.save();

  res.status(200).json(updatedUser.purchasedCourses);
});

router.get("/purchasedCourses", creatorMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    const purchasedCourseIds = await user.purchasedCourses;
    // Fetch all courses where the IDs match the purchasedCourseIds
    const courses = await Course.find({
      _id: { $in: purchasedCourseIds }, // Use $in to match IDs in the purchasedCourseIds array
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/askQuestion/:courseId", creatorMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    console.log(user);
    if (user.purchasedCourses && user.purchasedCourses.length === 0) {
      console.log("no courses buied");
      res.status(500).json({ error: "Internal Server Error" });
    }

    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    console.log(course);
    const questionCreated = {
      question: req.body.question,
      courseId: req.params.courseId,
      username: user.username,
      creatorUsername: course.creatorUsername,
    };

    const updatedQuestion = await Question.create(questionCreated);

    console.log(updatedQuestion);
    course.questions = course.questions || [];
    course.questions.push(updatedQuestion._id);
    await course.save();
    console.log("question");

    user.purchasedCourses.forEach((obj) => {
      if (obj._id.toString() === req.params.courseId) {
        console.log("reached here");
        obj.questions = obj.questions || [];
        console.log(obj);
        obj.questions.push(updatedQuestion._id);
        console.log(obj);
      }
    });

    console.log(user.purchasedCourses);

    await user.save();

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
