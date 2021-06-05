//导入 course model
const Course = require('../models/course');

//获取courses 数据操作
async function getAllCourses(req, res) {
    //  db.collection.find()
    const courses = await Course.find().exec();
    return res.json(courses);
    // 下面是比较老的写法，新的写法是 await
    // Course.findById().then().catch()
    // Course.findById((error, result)=>{
    // exec() 用处： query 在这里终止
   // })
  }
  
  async function getCourseById(req, res) {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.sendStatus(404);
    }
    return res.json(course);
  }
  
  async function updateCourseById(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    const course = await Course.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!course) {
      return res.sendStatus(404);
    }
    return res.json(course);
  }
  async function deleteCourseById(req, res) {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
    // return res.json(course);
  }


  async function createCourse(req, res) {
    const { code, name, description } = req.body;
      // validate data 
      //Course是model
      const course = new Course({ _id: code, name, description });
      await course.save();
      return res.status(201).json(course);
  }
  
  module.exports = {
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
    createCourse
  };