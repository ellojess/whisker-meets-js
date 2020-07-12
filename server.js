// Initialize express
const express = require('express')
const methodOverride = require('method-override')
const app = express()
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// var checkAuth = (req, res, next) => {
//   console.log("Checking authentication");
//   if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
//     req.user = null;
//   } else {
//     var token = req.cookies.nToken;
//     var decodedToken = jwt.decode(token, { complete: true }) || {};
//     req.user = decodedToken.payload;
//   }
//   next();
// };
// app.use(checkAuth);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


// Auth Setup
app.use(express.static(__dirname));

app.use(bodyParser.json());
const checkUser = require("./utils/checkUser")
app.use(checkUser)
app.use(cookieParser());

// controllers
require('./db/whiskersdb')

require('./controllers/dogs')(app);
require('./controllers/favorites')(app);
require('./controllers/comments')(app);
require('./controllers/auth')(app);


// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})