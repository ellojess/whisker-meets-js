/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");
let url;

if (process.env.IS_PRODUCTION){
  url = "mongodb://srv-captain--whiskers-mongo/mydatabase?authSource=admin"
} else {
  url = "mongodb://host.docker.internal:27017/whiskers-db?retryWrites=true&w=majority";
}


mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  { useNewUrlParser: true,
    authSource: "admin",
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,},
  function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to database");

    // db.close(); turn on for testing
  }
);

mongoose.set("debug", true);

module.exports = mongoose.connection;