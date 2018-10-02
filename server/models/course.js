var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  code: String,
  name: String,
  faculty: String,
  grad_level: String,
  co_reqs: String,
  pre_reqs: String,
  exclusions: String,
  course_des: String,
  handbook_url: String
});

var Course = mongoose.model("Course", CourseSchema);
module.exports = Course;