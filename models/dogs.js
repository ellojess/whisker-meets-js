const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DogSchema = new Schema({
    name: {type:String, required: true}, 
    desc: {type: String, default: ""}, 
    imgUrl: {type: String}, 
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createAt: {type: String}
});

module.exports = mongoose.model("Dog", DogSchema);