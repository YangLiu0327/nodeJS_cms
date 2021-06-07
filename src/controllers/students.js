const Student = require('../models/student');
const Course = require('../models/course');



async function createStudent(req,res){
  const {firstName, lastName, email}=req.body;
  const student = new Student ({
    firstName,
    lastName,
    email
  });
  await student.save();
  return res.json(student);
}

async function getStudentById(req, res) {
  const {id} = req.params;
  const student = await Student.findByID(id)
  .populate('courses', 'code name').exec();
  if(!student){
    return res.status(404).json('stundet not found');
  }
    return res.json(student);
  }
  


async function getAllStudents(req, res){
  const {page = 1, pageSize = 10, q='', fields} = req.query;  
  const limit = Math.max(pageSize * 1, 10);
  const skip = (Math.max(page * 1, 1) - 1) * limit;
  const students = await Student.find().limit(limit).skip(skip).exec();
  return res.json(students);
}






  async function updateStudentById(req, res) {
    const {id} = req.params;
    const { firstName, lastName, email } = req.body;
    const newStudent = await Student.findByIdAndUpdate(
      id,
      {firstName, lastName, email },
      {
        new: true
      }
    ).exec();
    if (!newStudent) {
      return res.status(404).json('course not found');
    }
    return res.json(newStudent);
  }



  async function deleteStudentById(req, res) {
     const {id} = req.params;
     const student = await Student.findByIdAndDelete(id).exec();
     if (!student) {
      return res.status(404).json('student not found');
    }
    await Course.updateMany(
      { students: student._id }, 
      {
        $pull:{
          students: student._id
        }
      }
    ).exec();
    return res.sendStatus(204);
  }

  
  module.exports = {
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    createStudent
  };