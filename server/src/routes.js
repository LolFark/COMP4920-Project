const CourseController = require('./controllers/CourseController');
const AuthenticationController = require('./controllers/AuthenticationController');
const CommentController = require('./controllers/CommentController');

module.exports = (app) => {
  app.get('/courses', CourseController.getCourses);
  app.post('/course', CourseController.getSpecificCourse);
  app.post('/courses', CourseController.addCourse);
  app.post('/register', AuthenticationController.register);
  app.post('/login', AuthenticationController.login);
  app.get('/comment', CommentController.getComments);
  app.post('/addComment', CommentController.addComment);
  app.post('/editComment', CommentController.editComment);
  app.post('/deletecomment', CommentController.deleteComment);
  app.post('/user', UserController.getUser);
};
