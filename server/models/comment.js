const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  username: { type: String },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  likedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created: { type: Date },
  edited: { type: Boolean },
  replies: [{
    username: String,
    created: Date,
    content: String,
    num_likes: Number,
  }],
  overallRating: { type: Number },
  difficulty: { type: Number },
  content: String,
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
