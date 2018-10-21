const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  username: { type: String },
  code: { type: String },
  likedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created: { type: Date },
  edited: { type: Boolean },
  replies: [{
    username: String,
    created: Date,
    content: String,
    num_likes: Number,
  }],
  rating: { type: Number },
  difficulty: { type: Number },
  content: String,
});

CommentSchema.index({ username: 1, code: -1 }, { unique: true });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
