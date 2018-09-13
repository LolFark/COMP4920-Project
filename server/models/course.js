var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  code: String,
  name: String,
  faculty: String,
  co_reqs: String,
  pre_reqs: String,
  exclusions: String,
  handbook_URL: String
});

var Course = mongoose.model("Course", CourseSchema);
module.exports = Course;