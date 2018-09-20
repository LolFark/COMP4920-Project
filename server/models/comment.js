var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    course: {type: Schema.Types.ObjectId, ref: 'Course'},
    liked_users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    created: {type: Timestamp},
    edited: {type: Boolean},
    replies: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    root: {type: Boolean},
    overall_rating: {type: Double},
    difficulty: {type: Double},
    content: String
})

var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;