const Comment = require('../../models/comment');

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
    const { user, course, content } = req.body;
    return Comment.deleteOne({ user, course, content }, (err) => {
      if (err) {
        console.log(`failed to delete comment by ${user} from ${course}`);
        return res.status(400).send({
          err,
        });
      }
      console.log(`comment by ${user} on ${course} deleted successfully`);
      return res.send({
        success: true,
      });
    });
  },

  async editComment(req, res) {
    const {
      user,
      course,
      created,
      newContent,
    } = req.body;
    await Comment.findOneAndUpdate({
      user,
      course,
      created,
    }, { content: newContent }, { new: true }, (err) => {
      if (err) {
        console.log(`failed to edit comment by ${user} on ${course}`);
        return res.status(400).send({ success: false });
      }
      console.log(`comment by ${user} on ${course} editted successfully`);
      return res.send({ success: true });
    });
  },
};
