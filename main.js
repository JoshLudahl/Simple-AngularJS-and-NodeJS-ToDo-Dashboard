//:::::::::::::::::::::::::::::::::::::::::::::::::::::::
//set up application  :::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::
"use strict";

var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./routes/helper');
var userService = require('./routes/login');

var flash = require('connect-flash');

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::
//configuration :::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::

mongoose.connect('');

//set up view paths
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//app settings
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(flash());

//Passport Setup
// Configure the local strategy for use by Passport.
//
// The local strategy require a 'verify' function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.



// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  userService.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(require('express-session')({
  secret: 'there are no secrets in life only robots and gold',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//Set some routes
//--public
var routes = require('./routes/index');
app.use('/', routes);

//--dashboard views
var dashboard = require('./routes/dashboard');
app.use('/dashboard', dashboard);

//register views
var register = require('./routes/register');
app.use('/register', register);

//login views
var loginview = require('./routes/login');
app.use('/login', loginview);

//simple logout & redirect back to login screen
app.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/login');
  });


//Handle Errors
app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', {
      url: req.url
    });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({
      error: 'Not found'
    });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

//launch app using system port or port 3000
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});