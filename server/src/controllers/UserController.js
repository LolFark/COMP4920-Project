const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

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
    const { username } = req.body;
    User.findOne({ username }, 'username display_name email password description comments liked_comments isAdmin', (error, user) => {
      if (error) {
        console.error(error);
      }
      res.send({
        user
      });
    });
  },
  async updatePassword(req, res) {
    const { username, old_password, new_password } = req.body;
    User.findOne({ username }, 'username display_name email password description comments liked_comments isAdmin', (error, user) => {
      if (error) {
        console.error(error);
      }
      bcrypt.compare(old_password, user.password, (err2, res2) => {
        if (err2) {
          return res.status(403).send({
            error: err2
          });
        }
        if (res2 === false) {
          // Old password does not match
          console.log('Old password does not match user password')
          return res.send({
            user,
            error: `Incorrect password`,
          });
        } else {
          // Old password does match
          console.log(`Updating database with new password`);
          const password = bcrypt.hashSync(new_password, saltRounds);
          // Change password in database
          User.findOneAndUpdate({ username }, { password }, { new: true }, (err3, updated_user) => {
            if (err3) {
              console.log(err3);
            }
            return res.send({
              user: updated_user,
              message: 'Password successfully changed.'
            });
          });
        }
      });
    });
  },
  async updateProfile(req, res) {
    const { username, display_name, description } = req.body;
    console.log(`Updating database with new profile data`);
    User.findOneAndUpdate({ username }, { display_name, description }, { new: true }, (error, updated_user) => {
      if (error) {
        console.log(error);
        return res.send({
          error
        });
      }
      return res.send({
        user: updated_user,
        message: 'Profile successfully changed.'
      });
    });
  }
};
