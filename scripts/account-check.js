/**
 * Change the value of the variable `myUsername` to your zid
 * Make sure you add your SSH public key as an authorized key in CSE
 */

const spawn = require('child_process').spawn;
const myUsername = 'z5123583';
const cseDomain = 'login.cse.unsw.edu.au';
const myLogin = myUsername + '@' + cseDomain;

/**
 * Checks if the zid is a malicious one
 * @param {String} zid
 * @returns {boolean}
 */
function isZidValid(zid) {
  const re = /^z[0-9]{7}$/;
  return re.test(zid);
}

/**
 * Checks if a zid exists in the cse system
 * @param {String} zid The zid to check for
 */
module.exports = async function checkZid(zid) {
  if (!isZidValid(zid)) {
    return false;
  }
  const commandToRun = 'ssh';
  const acc = 'acc ' + zid;
  const args = [myLogin, acc];
  const cmd = spawn(commandToRun, args);
  cmd.stdout.setEncoding('utf8');
  cmd.stderr.setEncoding('utf8');
  return cmd.stdout.on('data', () => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA');
    // result = true;
    return Promise.resolve(true);
  });
};
