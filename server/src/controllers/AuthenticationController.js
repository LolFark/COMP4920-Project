const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const zxcvbn = require('zxcvbn');
const User = require('../../models/user');
const config = require('../config/config');

function jwtSignUser(user) {
  const ONE_DAY = 60 * 60 * 24;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_DAY,
  });
}

const saltRounds = 10;

module.exports = {
  // Simple register function
  // TODO Add functionality and validation
  async register(req, res) {
    const { username, email } = req.body;
    const passwordPlaintext = req.body.password;
    const passStrength = zxcvbn(passwordPlaintext).score;
    if (passStrength < 1) {
      return res.status(400).send({ data: 'Password too weak' });
    }

    const password = bcrypt.hashSync(req.body.password, saltRounds);

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save((error) => {
      if (error) {
        console.error(error);
        console.log(error.errmsg);
        if (error.errmsg.match('email')) {
          res.send({
            error: 'Email already exists',
          });
        } else if (error.errmsg.match('username')) {
          res.send({
            error: 'Username already exists',
          });
        }
      } else {
        console.log(`User ${username} added`);
        res.send({
          success: true,
          message: `User ${username} added`,
        });
      }
    });
  },

  async login(req, res) {
    const { username, password } = req.body;
    console.log('login attempt');
    User.findOne({ username }).populate('likedComments').populate('dislikedComments').populate('comments').exec(function (err, user) {
      if (err) {
        console.log(err);
        return res.status(500).send({
          err,
        });
      }

      console.log(user.likedComments);
      // Authentication failed
      if (!user) {
        console.log(`${username} not found`);
        return res.status(403).send({
          err: 'Username or password incorrect',
        });
      }
      console.log(`${user.username} exists`);
      bcrypt.compare(password, user.password, (err, res2) => {
        if (err) {
          return res.status(403).send({
            error: err,
          });
        }
        if (res2 === false) {
          // Unsuccessful sign in
          return res.status(403).send({
            error: 'Login error',
          });
        }
        // Successful sign in
        console.log(`${user.username} has logged in successfully`);
        const foundUser = user.toJSON();
        const token = jwtSignUser(foundUser);
        console.log(`token is ${token}`);
        return res.status(200).send({
          user: foundUser,
          token,
          likedComments: user.likedComments,
          dislikedComments: user.dislikedComments,
          comments: user.comments,
        });
      });
    });
  },
};
