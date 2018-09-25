const Course = require("../../models/course");
module.exports = {
  // Fetch all courses
  async getCourses(req, res) {
    Course.find({}, 'code name pre_reqs co_reqs exclusions faculty handbook_url', function (error, courses) {
      if (error) {
        console.error(error);
      }
      res.send({
        courses: courses
      })
    }).sort({ code: 1 });
  }
}
