/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");
let url;

if (process.env.MONGODB_URL){
  url = process.env.MONGODB_URL
} else {
  url = "mongodb://host.docker.internal:27017/whiskers-db?retryWrites=true&w=majority";
}


mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  { useMongoClient: true,
    useNewUrlParser: true,
    authSource: "admin",
  },
  function(err, db) {
    console.log(err)
    assert.equal(null, err);
    console.log("Connected successfully to database");

    // db.close(); turn on for testing
  }
);

mongoose.set("debug", true);

module.exports = mongoose.connection;