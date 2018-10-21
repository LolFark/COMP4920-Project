const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  display_name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  description: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likedComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  dislikedComments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  isAdmin: Boolean,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
