const Course = require("../models/course");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// Create Student
const createCourse = async (req, res) => {
  const { title } = req.body;

  if (!name || !admissionNum || !dob) {
    throw new BadRequestError("Please Course Title");
  }

  req.body.createdBy = req.user.userId;

  const course = await Course.create(req.body);

  res.status(StatusCodes.CREATED).json({ course });
};

// Get All Courses
const getAllCourses = async (req, res) => {
  const { userId } = req.user;
  const students = await Course.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({ count: students.length, students });
};

// Get Single Student
const getSingleCourse = async (req, res) => {
  const {
    user: { userId },
    params: { id: courseId },
  } = req;

  const course = await Course.findOne({
    id: courseId,
    createdBy: userId,
  });

  if (!student) {
    throw new NotFoundError(`No Course Found with id ${courseId}`);
  }

  res.status(StatusCodes.OK).json({ course });
};

// Update Single Course
const updateCourse = async (req, res) => {
  const {
    body: { title },
    user: { userId },
    params: { id: courseId },
  } = req;

  if (title === "") {
    throw new BadRequestError("Course Title can not be empty");
  }

  const course = await Course.findOneAndUpdate(
    {
      createdBy: userId,
      id: courseId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!course) {
    throw new NotFoundError(`No Course Found with id ${courseId}`);
  }

  res.status(StatusCodes.OK).json({ course });
};

// Delete Single Course
const deleteCourse = async (req, res) => {
  const {
    user: { userId },
    params: { id: studentId },
  } = req;

  const student = await Students.findOneAndRemove({
    admissionNum: studentId,
    createdBy: userId,
  });

  if (!student) {
    throw new NotFoundError(
      `No student found with admission number ${studentId} `
    );
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
