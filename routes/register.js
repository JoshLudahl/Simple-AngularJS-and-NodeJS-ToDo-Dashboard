var express = require('express');
var register = express.Router();
var Users = require('../models/users');
var bcrypt = require('bcrypt');
const saltRounds = 10;

//get a list
// application -------------------------------------------------------------
register.get('/',
    function (req, res) {
        res.render('pages/register', {message:null});
    });


//add/create list item
register.post('/', function (req, res) {
    var raw = "";
    Users.find({ 'username': req.body.username }, function (err, user) {

        //if user is found
        if (user.length != 0) {
            //send the status
            return res.render('pages/register', {message: 'Username unavailable'});
        }

        //username not found, okay to create new user
        else {
            console.log("Username is: "+req.body.username);
            if (req.body.username !== '' && req.body.password !== '') {
              bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

                    Users.create({
                        username: req.body.username,
                        password: hash
                    }, function (err, user) {
                        if (err) {
                            console.log("Failed to create user, son");
                            res.send(err);

                        }

                        console.log("successfully saved user");
                        res.redirect('/login');

                    });

                });
            }
            else {
                res.render('pages/register', {message: 'Please try again.'});
            }
        }
    });
});




//export the modules
module.exports = register;