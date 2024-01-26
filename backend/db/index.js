require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_URL);

const QuestionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  resolved: {
    type: Boolean,
    default: false,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  creatorUsername: {
    type: String,
  },
  username: String,
});

const purchasedCoursesSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  rating: {
    type: Number,
    default: 0.0,
  },
  notes: [
    {
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      note: {
        type: String,
        default: "",
      },
    },
  ],
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

// Define schemas
const CreatorSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  purchasedCourses: [purchasedCoursesSchema],
});

const CourseDetailsSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default: 0.0,
  },
  noOfPeopleRated: {
    type: Number,
    default: 0,
  },
  noOfPeoplePurchased: {
    type: Number,
    default: 0,
  },
  lastUpdatedOn: {
    type: Date,
    default: Date.now,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [purchasedCoursesSchema],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  creatorUsername: String,
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  details: {
    type: CourseDetailsSchema,
  },
});

const Creator = mongoose.model("Creator", CreatorSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);
const Question = mongoose.model("Question", QuestionSchema);

module.exports = {
  Creator,
  User,
  Course,
  Question,
};
