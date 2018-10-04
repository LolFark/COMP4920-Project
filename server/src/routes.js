const CourseController = require('./controllers/CourseController');
const AuthenticationController = require('./controllers/AuthenticationController');
const CommentController = require('./controllers/CommentController');
const UserController = require('./controllers/UserController');

module.exports = (app) => {
  app.get('/courses', CourseController.getCourses);
  app.post('/course', CourseController.getSpecificCourse);
  app.post('/courses', CourseController.addCourse);
  app.post('/register', AuthenticationController.register);
  app.post('/login', AuthenticationController.login);
  app.post('/comment', CommentController.getComments);
  app.post('/addComment', CommentController.addComment);
  app.post('/editComment', CommentController.editComment);
  app.post('/deletecomment', CommentController.deleteComment);
  app.get('/users', UserController.getUsers);
  app.post('/user', UserController.getUser);
  app.post('/updatePassword', UserController.updatePassword);
  app.post('/updateProfile', UserController.updateProfile);
};
