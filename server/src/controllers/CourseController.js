const Course = require('../../models/course');

module.exports = {
  // Fetch all courses
  async getCourses(req, res) {
    Course.find({}, 'code name grad_level pre_reqs co_reqs exclusions faculty handbook_url', (error, courses) => {
      if (error) {
        console.error(error);
      }
      res.send({
        courses,
      });
    }).sort({ code: 1 });
  },

  async getSpecificCourse(req, res) {
    const { code } = req.body;
    Course.findOne({ code }, 'code name grad_level pre_reqs co_reqs exclusions faculty course_des handbook_url', (error, course) => {

      if (error) {
        console.error(error);
      }
      res.send({
        course,
      });
    });
  },

  addCourse(req, res) {
    const {
      code, name, faculty, coReqs, preReqs, exclusions, handbookURL,
    } = req.body;
    const newCourse = new Course({
      code,
      name,
      faculty,
      co_reqs: coReqs,
      pre_reqs: preReqs,
      exclusions,
      handbook_URL: handbookURL,
    });
    newCourse.save((error) => {
      if (error) {
        console.log(error);
      }
      console.log(`Course ${code} ${name} added`);
      res.send({
        success: true,
        message: `Course ${code} added`,
      });
    });
  }
};
