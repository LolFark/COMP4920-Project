const Course = require("../../models/course");
module.exports = {
  // Fetch all courses
  async getCourses(req, res) {
    Course.find({}, 'code name grad_level pre_reqs co_reqs exclusions faculty handbook_url', function (error, courses) {
      if (error) {
        console.error(error);
      }
      res.send({
        courses: courses
      })
    }).sort({ code: 1 });
  },

  async getSpecificCourse(req, res) {
    var code = req.body.code;
    Course.findOne({code: code}, 'code name grad_level pre_reqs co_reqs exclusions faculty course_des handbook_url', function (error, course) {
      if (error) {
        console.error(error);
      }
      res.send({
        course: course
      })
    });
  }
}
