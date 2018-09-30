const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('../config/config');
const zxcvbn = require('zxcvbn');

function jwtSignUser(user) {
  const ONE_DAY = 60 * 60 * 24;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_DAY,
  });
}

module.exports = {
  // Simple register function
  // TODO Add functionality and validation
  async register(req, res) {
    const { username, email } = req.body;
    var password_plaintext = req.body.password;
    var pass_strength = zxcvbn(password_plaintext).score;
    if (pass_strength < 1) {
      return res.status(400).send({data: 'Password too weak'});
    }

    const password = bcrypt.hashSync(password_plaintext, 10);

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save((error) => {
      if (error) {
        console.error(error);
      }
      console.log(`User ${username} added`);
      res.send({
        success: true,
        message: `User ${username} added`,
      });
    });
  },

  async login(req, res) {
    const { username, password } = req.body;
    console.log('login attempt');
    User.findOne({ username }, (error, user) => {
      if (error) {
        console.log(error);
        return res.status(500).send({
          error,
        });
      }

      // Authentication failed
      if (!user) {
        console.log(`${username} not found`);
        return res.status(403).send({
          error: 'Username or password incorrect',
        });
      }
      console.log(`${user.username} exists`);
      bcrypt.compare(password, user.password, (error) => {
        if (error) {
          return res.status(403).send({
            error: 'Login error',
          });
        }
        // successful sign in
        console.log(`${user.username} has logged in successfully`);
        const foundUser = user.toJSON();
        const token = jwtSignUser(foundUser);
        console.log(`token is ${token}`);
        return res.status(200).send({
          user: foundUser,
          token,
        });
      });
    });
  },
};
