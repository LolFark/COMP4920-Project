const bcrypt = require('bcryptjs');
const User = require('../../models/user');

const saltRounds = 10;

module.exports = {
  async getUsers(req, res) {
    User.find({}, 'username email password description comments liked_comments isAdmin', (error, users) => {
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
    User.findOne({ username }, 'username email password description comments liked_comments isAdmin', (error, user) => {
      if (error) {
        console.error(error);
      }
      res.send({
        user,
      });
    });
  },
  // Checks that the old password is valid and updates database if it is with new password
  async updatePassword(req, res) {
    const { username, old_password, new_password } = req.body;
    // Find user that wants to change password
    User.findOne({ username }, 'username email password description comments liked_comments isAdmin', (error, user) => {
      if (error) {
        console.error(error);
      }
      // Compare the password typed in by user and their actual password in database
      bcrypt.compare(old_password, user.password, (err2, res2) => {
        if (err2) {
          return res.status(403).send({
            error: err2,
          });
        }
        // Old password does not match
        if (res2 === false) {
          console.log('Old password does not match user password')
          return res.send({
            user,
            error: `Incorrect password`,
          });
        }
        // Old password does match
        console.log(`Updating database with new password`);
        const password = bcrypt.hashSync(newPassword, saltRounds);
        // Change password in database
        User.findOneAndUpdate({ username }, { password }, { new: true }, (err3, updatedUser) => {
          if (err3) {
            console.log(err3);
          }
          return res.send({
            user: updatedUser,
            message: 'Password successfully changed.',
          });
        });
      });
    });
  },
  // Checks if the email is in use and updates database if it is with new email
  async updateProfile(req, res) {
    const { username, email, description } = req.body;
    // Check if email is already in use
    User.findOne({ email }, '', (error, user) => {
      if (error) {
        res.send({
          error: 'Email already in use.',
        });
      }
    });
    console.log(`Updating database with new profile data`);
    User.findOneAndUpdate({ username }, { email, description }, { new: true }, (error, updatedUser) => {
      if (error) {
        console.log(error);
        res.send({
          error,
        });
      }
      res.send({
        user: updateUser,
        message: 'Profile successfully changed.',
      });
    });
  },
};
