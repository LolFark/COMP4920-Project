const User = require('../../models/user');

module.exports = {
  async getUsers(req, res) {
    User.find({}, 'username display_name email password description comments liked_comments isAdmin', (error, users) => {
      if (error) {
        console.error(error);
      }
      res.send({
        users,
      });
    });
  },
  async getUser(req, res) {
    const username = req.body.username;
    User.findOne({username: username}, 'username display_name email password description comments liked_comments isAdmin', (error, user) => {
      if (error) {
        console.error(error);
      }
      res.send({
        user
      })
    });
  }
};
