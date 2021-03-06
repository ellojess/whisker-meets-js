'use strict';

const serverless = require('serverless-http');

// Initialize express
const express = require('express')
const methodOverride = require('method-override')
const app = express()

const dotenv = require("dotenv").config();
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});

app.engine('handlebars', hbs.engine);

// Use handlebars to render
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

app.use(express.static('public'));

// Auth Setup
app.use(express.static(__dirname));
app.use(bodyParser.json());
const checkUser = require("./utils/checkUser")
app.use(checkUser)
app.use(cookieParser());

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};
app.use(checkAuth);

// controllers
require('./db/whiskersdb')

require('./controllers/dogs')(app);
require('./controllers/favorites')(app);
require('./controllers/comments')(app);
require('./controllers/auth')(app);
require('./controllers/replies')(app);


// Choose a port to listen on
const port = process.env.PORT || 8080;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 8080!')
})

module.exports.handler = serverless(app);