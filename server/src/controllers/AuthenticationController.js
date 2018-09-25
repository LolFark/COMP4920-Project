const User = require('../../models/user');
const bcrypt = require('bcryptjs');

function validate_email(email) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  alert("You have entered an invalid email address!")
  return false;
}

module.exports = {
  // Simple register function
  // TODO Add functionality and validation
  async register(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    if(!validate_email(email)) {
      return res.status(400).send({data: "Invalid email address"});
    }
    var password = bcrypt.hashSync(req.body.password, 10);

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

  async login(req, res) {}
}
