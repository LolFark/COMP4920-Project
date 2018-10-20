const Comment = require('../../models/comment');
const User = require('../../models/user');

module.exports = {
  async getComments(req, res) {
    Comment.find({ code: req.body.code }, (err, comments) => {
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
      code,
      content,
      rating,
      difficulty,
    } = req.body;
    const created = new Date();
    const newComment = new Comment({
      username,
      code,
      created,
      content,
      rating,
      difficulty,
    });
    await newComment.save((error, comment) => {
      if (error) {
        console.log(error);
        res.send({
          error: 'Failed to post comment',
        });
      }
      console.log(`new comment added to ${code}`);
      res.send({
        comment,
      });
    });
  },

  async deleteComment(req, res) {
    const { username, code, content } = req.body;
    return Comment.deleteOne({ username, code, content }, (err) => {
      if (err) {
        console.log(`failed to delete comment by ${username} from ${code}`);
        return res.status(400).send({
          err,
        });
      }
      console.log(`comment by ${username} on ${code} deleted successfully`);
      return res.send({
        success: true,
      });
    });
  },

  async editComment(req, res) {
    const {
      username,
      code,
      oldContent,
      newContent,
    } = req.body;
    await Comment.findOneAndUpdate({
      username,
      code,
      content: oldContent,
    }, { content: newContent }, { new: true }, (err) => {
      if (err) {
        console.log(`failed to edit comment by ${username} on ${code}`);
        return res.status(400).send({ success: false });
      }
      console.log(`comment by ${username} on ${code} editted successfully`);
      return res.send({ success: true });
    });
  },
  async upVoteComment(req, res) {
    const { comment, user, votes } = req.body;
    await Comment.findOneAndUpdate({ _id: comment._id }, {$addToSet: {likedUsers: user.username}, $set: {commentRating: votes}}, {new: true}, (err) => {
      if (err) {
        console.log(`failed to add ${user.username} to ${comment.course}'s comment's liked users`)
        return res.status(400).send({ success: false });
      }
      console.log(`${user.username} successfully added to comment's liked users`)
      console.log(`comment now has ${comment.commentRating}`);
      return res.send({ commentRating: comment.commentRating });
    });
  },
  async downVoteComment(req, res) {
    const { comment, user, votes } = req.body;
    await Comment.findOneAndUpdate({ _id: comment._id }, {$pull: {likedUsers: user.username}, $set: {commentRating: votes }}, {new: true}, (err) => {
      if (err) {
        console.log(`failed to add ${user.username} to ${comment.course}'s comment's liked users`)
        return res.status(400).send({ success: false });
      }
      console.log(`${user.username} successfully added to comment's liked users`)
      console.log(`comment now has ${comment.commentRating}`);
      return res.send({ commentRating: comment.commentRating });
    })
  },
  async getUserComments(req, res) {
    Comment.find({ username: req.body.username }, (err, comments) => {
      console.log(req.body.username);
      if (err) {
        console.log(err);
        return res.status(404).send({
          error: err,
        });
      }
      console.log(comments);
      return res.send({
        comments,
      });
    });
  },
};
