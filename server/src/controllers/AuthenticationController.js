<<<<<<< 18569f236f3be03fb88ba2f1f30dd941e5f28fb7
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
=======
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

function validate_email(email) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  console.log('You have entered an invalid email address!');
  return false;
}
>>>>>>> updated eslint and changed some files to follow airbnb styleguide

const saltRounds = 10;

module.exports = {
  // Simple register function
  // TODO Add functionality and validation
  async register(req, res) {
<<<<<<< 18569f236f3be03fb88ba2f1f30dd941e5f28fb7
    var username = req.body.username;
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password, saltRounds);
=======
    const { username, email } = req.body;

    if (!validate_email(email)) {
      return res.status(400).send({ data: 'Invalid email address' });
    }
    const password = bcrypt.hashSync(req.body.password, 10);
>>>>>>> updated eslint and changed some files to follow airbnb styleguide

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
<<<<<<< 18569f236f3be03fb88ba2f1f30dd941e5f28fb7
    User.findOne({username: username}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(500).send({
          error: err
=======
    User.findOne({ username }, (error, user) => {
      if (error) {
        console.log(error);
        return res.status(500).send({
          error,
>>>>>>> updated eslint and changed some files to follow airbnb styleguide
        });
      }

      // Authentication failed
      if (!user) {
        return res.status(403).send({
          error: 'Username or password incorrect',
        });
      }
      bcrypt.compare(password, user.password, (error) => {
        if (error) {
          console.log('Login successful');
          return res.status(200).send();
        }
        return res.status(403).send({
          error: 'Username or password incorrect',
        });
      });
    });
  },
};
