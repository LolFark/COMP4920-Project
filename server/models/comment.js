<<<<<<< HEAD
const mongoose = require('mongoose');

const { Schema } = mongoose;

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
=======
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    course: {type: Schema.Types.ObjectId, ref: 'Course'},
    liked_users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    created: {type: Date},
    edited: {type: Boolean},
    replies: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    root: {type: Boolean},
    overall_rating: {type: Number},
    difficulty: {type: Number},
    content: String
})

var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
>>>>>>> ea4c8b062c261d34e8b72c4330c90e45ce4de4fa
