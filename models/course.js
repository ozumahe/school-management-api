const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Course Title  must be Provided"],
    maxlength: 50,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Form Teacher Id must be Provided"],
  },
});

module.exports = mongoose.model("Course", CourseSchema);
