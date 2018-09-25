var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');
SALT_FACTOR = 10

var UserSchema = new Schema({
    username: { type: String},
    email: { type: String},
    password: { type: String},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    liked_comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    isAdmin: Boolean,
})

// Function called before save to DB
// UserSchema.pre('save', function (next) {
    // var user = this;

    // if (!user.isModified('password')) {
        // return next();
    // }
    // bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        // if (err) {
            // return next(err);
        // }

        // bcrypt.hash(User.password, salt, function (err, hash) {
            // if (err) {
                // return next(err);
            // }
            // User.password = hash;
            // next();

        // })
    // })
// });

// UserSchema.methods.comparePassword = function (input, callback) {
    // bcrypt.compare(input, this.password, function (err, isMatch) {
        // if (err) {
            // return callback(err);
        // }
        // callback(undefined, isMatch);
    // });
// };

var User = mongoose.model("User", UserSchema);
module.exports = User;