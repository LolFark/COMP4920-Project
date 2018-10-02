const bcrypt = require('bcryptjs');
const check_zid = require('../../../scripts/account-check')
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('../config/config');

function jwtSignUser(user) {
  const ONE_DAY = 60 * 60 * 24;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_DAY,
  });
}

function extract_username(email) {
  return email.match(/^([^@]*)@/)[1];
}

module.exports = {
  // Simple register function
  // TODO Add functionality and validation
  async register(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    
    if(!validate_email(email)) {
      return res.status(400).send({data: 'Invalid email address'});
    }
    var zid = extract_username(email);
    if(!check_zid(zid)) {
      return res.status(400).send({data: 'zID does not exist in the system'})
    }
    var password = bcrypt.hashSync(req.body.password, 10);
    var new_user = new User({
      username: username,
      email: email,
      password: password
    })

    await new_user.save((error) => {
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
