
const Student = require('../models/student');
const Course = require('../models/course');




async function getAllStudents(req, res) {
  // const {page = 1, pageSize = 10, q='', fields} = req.query;  
  // const limit = Math.max(pageSize * 1, 10);
  // const skip = (Math.max(page * 1, 1) - 1) * limit;
  const students = await Student.find().exec();
  return res.json(students);
}


async function getStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id)
  .populate('courses', 'name').exec();
  if (!student) {
    return res.sendstatus(404).json('stundet not found');
  }
  return res.json(student);
  }
  

  async function updateStudentById(req, res) {
  const {id} = req.params;
  const { firstName, lastName, email } = req.body;
  const student = await Student.findByIdAndUpdate(
    id,
    {firstName, lastName, email },
    {new: true}
  ).exec();
  if (!student) {
    return res.sendStatus(404).json('course not found');
  }
  return res.json(student);
}


async function deleteStudentById(req, res) {
  const {id} = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
   return res.sendStatus(404).json('student not found');
 }
 await Course.updateMany(
   { 
    _id: { $in: student.courses }
     }, 
   {
    $pull: {
      students: student._id
     }
   }
 ).exec();
 return res.sendStatus(204);
}


async function createStudent(req, res) {
  const { firstName, lastName, email } = req.body;
  const student = new Student ({
    firstName,
    lastName,
    email
  });
  await student.save();
  return res.status(201).json(student);
}


async function addStudentToCourse(req, res) {
  // get student id, get course code
  const { id, code } = req.params;
  // find student
  const student = await Student.findById(id).exec();
  // find course
  const course = await Course.findById(code).exec();
  // check student or course exist
  if (!student || !course) {
    return res.sendStatus(404);
  }

  student.courses.addToSet(course._id);
  course.students.addToSet(student._id);
  await student.save();
  await course.save();
  // return updated student or return 200/201
  return res.json(student);
}


async function removeStudentFromCourse(req, res) {
  const { id, code } = req.params;
  const student = await Student.findById(id).exec();
  const course = await Course.findById(code).exec();
  if (!student || !course) {
    return res.sendStatus(404);
  }
  student.courses.pull(course._id);
  course.students.pull(student._id);
  await student.save();
  await course.save();
  return res.json(student);
}
module.exports = {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  createStudent,
  addStudentToCourse,
  removeStudentFromCourse
};