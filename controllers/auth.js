const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("home")

    })

}