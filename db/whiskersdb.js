/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

// const url = process.env.MONGODB_URI || "mongodb://localhost/whiskers-db";
const url = process.env.MONGODB_URI || "mongodb://mongo:270217/whiskers-db";

mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  { useNewUrlParser: true },
  function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to database");

    // db.close(); turn on for testing
  }
);
// mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));

mongoose.connect('mongodb://localhost/testdb').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

mongoose.set("debug", true);

module.exports = mongoose.connection;