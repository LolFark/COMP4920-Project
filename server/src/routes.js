const CourseController = require('./controllers/CourseController');
const AuthenticationController = require('./controllers/AuthenticationController');
const CommentController = require('./controllers/CommentController');
const ReplyController = require('./controllers/ReplyController');
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
  app.post('/deleteComment', CommentController.deleteComment);
  app.post('/getUserComments', CommentController.getUserComments);
  app.post('/addReply', ReplyController.addReply);
  app.post('/editReply', ReplyController.editReply);
  app.post('/deleteReply', ReplyController.deleteReply);
  app.get('/users', UserController.getUsers);
  app.post('/user', UserController.getUser);
  app.post('/updatePassword', UserController.updatePassword);
  app.post('/updateProfile', UserController.updateProfile);
};
