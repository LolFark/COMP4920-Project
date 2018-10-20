const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  username: { type: String },
  likedUsers: [{ type: String }],
  code: { type: String },
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

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
