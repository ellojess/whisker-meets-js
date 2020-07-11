const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
  });

module.exports = mongoose.model("User", UserDetail)