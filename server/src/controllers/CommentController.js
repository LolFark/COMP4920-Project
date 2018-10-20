const Comment = require('../../models/comment');

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
    } = req.body;
    const created = new Date();
    const newComment = new Comment({
      username,
      code,
      created,
      content,
      rating,
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
