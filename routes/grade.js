const express = require("express");
const router = express.Router();

const {
  addStudentGrade,
  getStudentGrades,
  updeateStudentGrade,
} = require("../controllers/grade");

router.route("/").post(addStudentGrade);
router.route("/:id").get(getStudentGrades).patch(updeateStudentGrade);

module.exports = router;
