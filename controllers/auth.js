const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = (app) => {
    // SIGN UP FORM
    app.get("/sign-up", (req, res) => {
      res.render("sign-up");
    });

    // SIGN UP POST
    app.post("/sign-up", (req, res) => {
        // Create User
        const user = new User(req.body);

        user
        .save()
        .then(user => {
            var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect("/");
        })
        .catch(err => {
            console.log(err.message);
            return res.status(400).send({ err: err });
        });
    });


  }