const Course = require('../../models/course');
const Comment = require('../../models/comment');

module.exports = {
  // Fetch all courses
  async getCourses(req, res) {
    Course.find({}, (error, courses) => {
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
    Course.findOne({ code }, (error, course) => {
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
      code, name, faculty, coReqs, preReqs, exclusions, handbookURL, courseDescription,
    } = req.body;
    const newCourse = new Course({
      code,
      name,
      faculty,
      co_reqs: coReqs,
      pre_reqs: preReqs,
      exclusions,
      handbook_url: handbookURL,
      popularity: 0,
      course_des: courseDescription,
      difficulty: 0,
    });
    return newCourse.save((error) => {
      if (error) {
        console.log(error);
        return res.status(500).send({
          error: `Could not add course ${code}`,
        });
      }
      console.log(`Course ${code} ${name} added`);
      return res.send({
        success: true,
        message: `Course ${code} added`,
      });
    });
  },

  async updateRating(req, res) {
    const { code, satisfaction, difficulty } = req.body;
    return Course.findOneAndUpdate(
      { code },
      {
        popularity: satisfaction,
        difficulty,
      },
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Could not update');
        }
        return res.send('Successfully updated ratings');
      },
    );
  },
};
