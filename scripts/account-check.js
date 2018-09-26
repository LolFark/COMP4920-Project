/**
 * Change the value of the variable `my_username` to your zid
 * Make sure you add your SSH public key as an authorized key in CSE
 */

var spawn = require('child_process').spawn;
var my_username = 'z5123583';
var cse_domain = 'login.cse.unsw.edu.au';
var my_login = my_username + '@' + cse_domain;

/**
 * Checks if the zid is a malicious one
 * @param {String} zid 
 * @returns {boolean}
 */
function is_zid_valid(zid) {
  var re = /^z[0-9]{7}$/;
  return re.test(zid);
}

/**
 * Checks if a zid exists in the cse system
 * @param {String} zid The zid to check for 
 */
module.exports = function check_zid(zid) {
  if (!is_zid_valid(zid)) {
    return false;
  }
  var command_to_run = 'ssh';
  var acc = 'acc ' + zid;
  var args = [my_login, acc];
  var cmd  = spawn(command_to_run, args);
  cmd.stdout.setEncoding('utf8');
  cmd.stderr.setEncoding('utf8');
  var result = false;
  cmd.stdout.on('data', function (_data) {
    result = true;
  });
  cmd.stderr.on('data', function(_data) {
    result = false;
  });
  return result;
};

