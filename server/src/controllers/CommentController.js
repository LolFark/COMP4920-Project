const Comment = require('../../models/comment');

module.exports = {
  async getComments(req, res) {
    Comment.findAll({code: req.body.code}, function(err, comments) {
      if (err) {
        console.log(err);
        return res.status(404).send({
          error: err
        })
      }
      return res.send({
        comments: comments
      })
    })
  }
}