const Comment = require('../../models/comment');
const User = require('../../models/user');

module.exports = {
  async getComments(req, res) {
    Comment.find({ course: req.body.course_id }, (err, comments) => {
      if (err) {
        console.log(err);
        return res.status(404).send({
          error: err,
        });
      }
      return res.send({
        comments,
      });
    });
  },

  async addComment(req, res) {
    const {
      username,
      course,
      content,
    } = req.body;
    const created = new Date();
    const newComment = new Comment({
      username,
      course,
      created,
      content,
      overallRating: 1,
    });
    await newComment.save((error, comment) => {
      if (error) {
        console.log(error);
        res.send({
          error: 'Failed to post comment',
        });
      }
      console.log(`new comment added to ${course}`);
      res.send({
        comment,
      });
    });
  },

  async deleteComment(req, res) {
    const { username, course, content } = req.body;
    return Comment.deleteOne({ username, course, content }, (err) => {
      if (err) {
        console.log(`failed to delete comment by ${username} from ${course}`);
        return res.status(400).send({
          err,
        });
      }
      console.log(`comment by ${username} on ${course} deleted successfully`);
      return res.send({
        success: true,
      });
    });
  },

  async editComment(req, res) {
    const {
      username,
      course,
      created,
      newContent,
    } = req.body;
    await Comment.findOneAndUpdate({
      username,
      course,
      created,
    }, { content: newContent }, { new: true }, (err) => {
      if (err) {
        console.log(`failed to edit comment by ${username} on ${course}`);
        return res.status(400).send({ success: false });
      }
      console.log(`comment by ${username} on ${course} editted successfully`);
      return res.send({ success: true });
    });
  },
  async upVoteComment(req, res) {
    const { comment, user } = req.body;
    await Comment.findOneAndUpdate({ _id: comment._id }, {$addToSet: {likedUsers: user.username}, $inc: {overallRating: 1}}, {new: true}, (err) => {
      if (err) {
        console.log(`failed to add ${user.username} to ${comment.course}'s comment's liked users`)
        return res.status(400).send({ success: false });
      }
      console.log(`${user.username} successfully added to comment's liked users`)
      console.log(`comment now has ${comment.overallRating}`);
      return res.send({ success: true });
    });
  },
  async downVoteComment(req, res) {
    const { comment, user } = req.body;
    await Comment.findOneAndUpdate({ _id: comment._id }, {$pull: {likedUsers: user.username}, $inc: {overallRating: -1}}, {new: true}, (err) => {
      if (err) {
        console.log(`failed to add ${user.username} to ${comment.course}'s comment's liked users`)
        return res.status(400).send({ success: false });
      }
      console.log(`${user.username} successfully added to comment's liked users`)
      console.log(`comment now has ${comment.overallRating}`);
      return res.send({ success: true });
    });
  },
};
