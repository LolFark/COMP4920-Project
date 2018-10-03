const User = require('../../models/user');

module.exports = {
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
