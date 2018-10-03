const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  liked_comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  isAdmin: Boolean,
});

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

const User = mongoose.model('User', UserSchema);
module.exports = User;
