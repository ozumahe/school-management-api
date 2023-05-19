const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");

router.route("/").get(getAllCourses).post(createCourse);
router
  .route("/:id")
  .get(getSingleCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
