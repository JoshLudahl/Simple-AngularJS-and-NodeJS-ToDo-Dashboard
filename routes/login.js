var express = require('express');
var userService = express.Router();
var Users = require('../models/users');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
const saltRounds = 10;
var flash = require('connect-flash');

passport.use(new Strategy(
  {
  passReqToCallback : true
},
  function (req, username, password, cb) {

    userService.findByUsername(username, function (err, user) {
      if (err) {
          
        return cb(err);
      }
      if (!user) {
        return cb(null, false, req.flash('message','Invalid username or password'));
      }

      if (!bcrypt.compareSync(password, user.password)) {
        console.log("incorrect password or username");
        return cb(null, false, req.flash('message','Invalid username or password'));
      }
      return cb(null, user);
    });
  }));

userService.get('/',
  function (req, res) {
    res.render('pages/login', { message: req.flash('message') });
  });

userService.post('/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash : true
  }),
  function (req, res) {
    res.redirect('/dashboard');
  });



userService.findByUsername = function(username, cb) {
    process.nextTick(function() {
        Users.findOne({ username: username }, function(err, item) {
            if (err) {
                console.log("invalid username or password.");
                cb(err);
            }
            console.log("invalid");
            return cb(null, item);
        });
    });
}

userService.findById = function(id, cb) {
    process.nextTick(function() {
        Users.findOne({ _id: id }, function(err, item) {
            if (err) cb(err);
            return cb(null, item);
        });
    });
}

module.exports = userService;