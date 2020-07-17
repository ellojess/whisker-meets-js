const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const DogSchema = new Schema({
    name: {type:String, required: true}, 
    desc: {type: String, default: ""}, 
    imgUrl: {type: String}, 
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date },
    author : { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    favorites:[{ type: Schema.Types.ObjectId, ref: "User"}]
}, {minimize:false});

DogSchema
    .pre('findOne', Populate('author')).pre('find', Populate('author'))
    .pre('findOne', Populate('comments')).pre('find', Populate('comments'));

module.exports = mongoose.model("Dog", DogSchema);