const CourseController = require('./controllers/CourseController');
const AuthenticationController = require('./controllers/AuthenticationController');
const CommentController = require('./controllers/CommentController');

module.exports = (app) => {
<<<<<<< 18569f236f3be03fb88ba2f1f30dd941e5f28fb7
  app.get('/courses', CourseController.getCourses)
  app.post('/course', CourseController.getSpecificCourse)
  app.post('/register', AuthenticationController.register)
  app.post('/login', AuthenticationController.login)
  app.get('/comments', CommentController.getComments)
}
=======
  app.get('/courses', CourseController.getCourses);
  app.post('/courses', CourseController.addCourse);
  app.post('/register', AuthenticationController.register);
  app.post('/login', AuthenticationController.login);
};
>>>>>>> updated eslint and changed some files to follow airbnb styleguide
