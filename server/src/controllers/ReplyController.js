const Reply = require('../../models/replies');
const Comment = require('../../models/comment');

module.exports = {
  async getReplies(req, res) {
    Reply.find({ course: req.body.course_id }, (err, comments) => {
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

  async addReply(req, res) {
    const {
      username,
      commentId,
      content,
    } = req.body;
    const created = new Date();
    const newReply = {
      username,
      created,
      content,
      num_likes: 0,
    };
    Comment.findOneAndUpdate(
      { _id: commentId },
      { $push: { replies: newReply } },
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            error: 'Failed to post comment',
          });
        }
        console.log(`new reply added to ${commentId}`);
        res.send({
          success: true,
        });
      },
    );
  },

  async deleteReply(req, res) {
    const { username, course, content } = req.body;
    return Reply.deleteOne({ username, course, content }, (err) => {
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

  async editReply(req, res) {
    const {
      username,
      course,
      created,
      newContent,
    } = req.body;
    await Reply.findOneAndUpdate({
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
};
