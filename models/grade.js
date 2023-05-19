const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: [true, "Score must be Provided"],
  },
  grade: {
    type: String,
    required: [true, "Grade Must be Provided"],
    maxlength: 1,
  },
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User Id must be Provided"],
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: [true, "Course Id must be Provided"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Form Teacher Id must be Provided"],
  },
});

module.exports = mongoose.model("Grade", GradeSchema);
