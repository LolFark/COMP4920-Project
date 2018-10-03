const Comment = require('../../models/comment');

module.exports = {
  async getComments(req, res) {
    Comment.findAll({ code: req.body.code }, (err, comments) => {
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
      user,
      course,
      created,
      content,
    } = req.body;
    const newComment = new Comment({
      user,
      course,
      created, // change this?
      content,
    });
    await newComment.save((error) => {
      if (error) {
        console.log(error);
        res.send({
          error: 'Failed to post comment',
        });
      }
      console.log(`new comment added to ${course}`);
      res.send({
        status: true,
        message: `Comment posted to ${course}`,
      });
    });
  },

  async deleteComment(req, res) {
    const { user, course, content } = req.body;
    await Comment.deleteOne({ user, course, content }, (err) => {
      if (err) {
        console.log(`failed to delete comment by ${user} from ${course}`);
        res.send({
          err,
        });
      }
      console.log(`comment by ${user} on ${course} deleted successfully`);
      res.send({
        success: true,
      });
    });
  },

  async editComment(req, res) {
    const {
      user,
      course,
      created,
      content,
      newContent,
    } = req.body;
    await Comment.findAndUpdateOne({
      user,
      course,
      created,
      content,
    }, { content: newContent }, (err) => {
      if (err) {
        console.log(`failed to edit comment by ${user} on ${course}`);
      }
      console.log(`comment by ${user} on ${course} editted successfully`);
      res.send({
        success: true,
      });
    });
  },
};
