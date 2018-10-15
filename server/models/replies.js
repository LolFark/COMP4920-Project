const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReplySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  liked_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created: { type: Date },
  edited: { type: Boolean },
  content: String,
});

const Reply = mongoose.model('Reply', ReplySchema);
module.exports = Reply;
