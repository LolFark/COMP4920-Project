var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    hash: {type: String, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    liked_comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    isAdmin : Boolean,
})

var User = mongoose.model("User", UserSchema);
module.exports = User;