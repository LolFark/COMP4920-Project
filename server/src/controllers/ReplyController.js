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
    const { comment, username, content } = req.body;
    const created = new Date();
    const newReply = {
      username,
      created,
      content,
      num_likes: 0,
    };
    Comment.findOneAndUpdate({ _id: comment }, { $push: { replies: newReply } }, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send({
            error: 'Failed to post comment',
          });
        }
        console.log(`new reply added to ${comment}`);
        res.send({
          success: true,
          reply: newReply,
        });
      },
    );
  },

  async deleteReply(req, res) {
    const { _id, reply } = req.body;
    Comment.findOneAndUpdate({ _id }, { $pull: { replies: reply }}, (err) => {
      if (err) {
        console.log(`failed to remove comment`);
        return res.status(400).send({
          err,
        });

      }
      console.log(`comment deleted successfully`);
      return res.send({
        success: true,
      });
    });
  },

  async editReply(req, res) {
    const { comment, reply, newContent } = req.body;
    await Comment.findOneAndUpdate({ _id: comment, replies: reply }, { $set: { 'replies.$.content': newContent } }, (err) => {
      if (err) {
        console.log(`failed to edit comment by ${reply.username} on ${comment.code}`);
        return res.status(400).send({ success: false });
      }
      console.log(`comment by ${reply.username} on ${comment.code} editted successfully`);
      return res.send({ success: true });
    });
  },
};
