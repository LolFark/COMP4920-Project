const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  liked_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created: { type: Date },
  edited: { type: Boolean },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
  overall_rating: { type: Number },
  difficulty: { type: Number },
  content: String,
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
