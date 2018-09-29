const CourseController = require('./controllers/CourseController');
const AuthenticationController = require('./controllers/AuthenticationController');

module.exports = (app) => {

  app.get('/courses', CourseController.getCourses)
  app.post('/courses', CourseController.addCourse);
  app.post('/course', CourseController.getSpecificCourse)
  app.post('/register', AuthenticationController.register)
  app.post('/login', AuthenticationController.login)
}
