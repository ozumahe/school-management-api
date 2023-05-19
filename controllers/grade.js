const Grade = require("../models/grade");
const Students = require("../models/students");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { calculateGrade } = require("../utils/grade");

// Add Student Grade
const addStudentGrade = async (req, res) => {
  const { score, userId, courseId } = req.body;

  if (!score || !userId) {
    throw new BadRequestError("Please Provide Score, UserId");
  }

  const studentGrade = await calculateGrade(score);

  const grade = await Grade.create({
    score,
    courseId,
    grade: studentGrade,
    studentId: userId,
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ grade });
};

// Get Student Grade
const getStudentGrades = async (req, res) => {
  const {
    params: { studentId },
  } = req;

  const student = await Students.findOne({
    admissionNum: studentId,
  });

  if (!student) {
    throw new NotFoundError(`No user with admission Number ${studentId}`);
  }

  const grades = await Grade.findOne({
    admissionNum: studentId,
  });

  res.status(StatusCodes.OK).json({ grades });
};

// Update Student Grade
const updeateStudentGrade = async (req, res) => {
  const {
    body: { courseId },
    params: { id: studentId },
  } = req;

  if (courseId === "") {
    throw new BadRequestError("Course Id can not be empty");
  }

  const student = await Students.findOneAndUpdate(
    {
      createdBy: userId,
      admissionNum: studentId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!student) {
    throw new NotFoundError(`No user with admission Number ${studentId}`);
  }

  res.status(StatusCodes.OK).json({ student });
};

module.exports = {
  addStudentGrade,
  getStudentGrades,
  updeateStudentGrade,
};
