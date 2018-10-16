const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReplySchema = new Schema({
  username: { type: String },
  num_likes: { type: Number },
  liked_users: [{ type: Schema.Types.ObjectId, ref: 'User' }], // get rid of this
  created: { type: Date },
  edited: { type: Boolean },
  content: String,
});

const Reply = mongoose.model('Reply', ReplySchema);
module.exports = Reply;
