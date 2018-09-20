const CourseController = require('./controllers/CourseController');

module.exports = (app) => {
  app.get('/courses', CourseController.getCourses)
}