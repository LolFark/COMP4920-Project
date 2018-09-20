const User = require('../../models/user')
const bcrypt = require('bcryptjs')

const saltRounds = 10;

module.exports = {
  // Simple register function
  // TODO Add functionality and validation
  async register(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password, saltRounds);

    var new_user = new User({
      username: username,
      email: email,
      password: password
    })

    new_user.save(function (error) {
      if (error) {
        console.error(error);
      }
      console.log(username + " added");
      res.send({
        success: true,
        message: "New user " + username + " added"
      })
    })
  },

  async login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log('login attempt');
    User.findOne({username: username}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(500).send({
          error: err
        });
      }

      // Authentication failed
      if (!user) {
        return res.status(403).send({
          error: 'Username or password incorrect'
        });
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          console.log('Login successful');
          return res.status(200).send();
        } else {
          return res.status(403).send({
            error: 'Username or password incorrect'
          })
        }
      })
    })
  }
}
