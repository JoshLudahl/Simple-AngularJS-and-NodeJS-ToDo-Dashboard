var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

//create a function to get the list
function getTodoList(res) {
    Todo.find(function(err,todoa){
        if (err) res.send(err);
        res.json(todoa);
    });
};

//get a list
// application -------------------------------------------------------------
router.get('/',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        res.render('pages/dashboard', { user: req.user });
    });

router.get('/todo', function(req, res) {
   getTodoList(res);
});

//add/create list item
router.post('/todo', function(req, res) {
        Todo.create({
            name: req.body.item,
            completed: false
        }, function (err, todo) {
            if (err) {
                res.send(err);
                console.log("failed, son")
            }

            //will make call to get the list, but
            //for now will just log the action
            //uncomment the function
            console.log("successfully saved item");
            getTodoList(res);
        });
});

//remove list item
router.delete('/todo/:todo_id', function(req, res){
   Todo.remove({
       _id: req.params.todo_id
   },function(err, todo){
       if(err) res.send(err);

       //will make call to get the list, but
       //for now will just log the action
       //uncomment the function
       console.log("item deleted")
       getTodoList(res);
   });
});

//export the modules
module.exports = router;