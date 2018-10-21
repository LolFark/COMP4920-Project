const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema({
  code: { type: String },
  name: { type: String },
  faculty: { type: String },
  grad_level: { type: String },
  co_reqs: { type: String },
  pre_reqs: { type: String },
  exclusions: { type: String },
  course_des: { type: String },
  handbook_url: { type: String },
  popularity: { type: Number },
  difficulty: { type: Number },
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
