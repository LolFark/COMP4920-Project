const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const zxcvbn = require('zxcvbn');
const checkZid = require('../../../scripts/account-check');
const User = require('../../models/user');
const config = require('../config/config');

function jwtSignUser(user) {
  const ONE_DAY = 60 * 60 * 24;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_DAY,
  });
}

function extractUsername(email) {
  return email.match(/^([^@]*)@/)[1];
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
    const zid = extractUsername(email);
    const isValidZid = await checkZid(zid);
    if (!isValidZid) {
      return res.status(400).send({ data: 'zID does not exist in the system' });
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
      bcrypt.compare(password, user.password, (err, res2) => {
        if (err) {
          return res.status(403).send({
            error: err,
          });
        }
        if (res2 === false) {
          // Unsuccessful sign in
          return res.status(403).send({
            error: `Login error`,
          });
        } else {
          // Successful sign in
          console.log(`${user.username} has logged in successfully`);
          const foundUser = user.toJSON();
          const token = jwtSignUser(foundUser);
          console.log(`token is ${token}`);
          return res.status(200).send({
            user: foundUser,
            token,
          });
        }
      });
    });
  },
};
