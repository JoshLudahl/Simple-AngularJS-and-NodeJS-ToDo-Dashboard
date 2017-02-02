var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
  response.render('pages/index');
});

router.get('/about', function(request, response) {
  response.render('pages/about');
});

router.get('/contact', function(request, response) {
  response.render('pages/contact');
});

module.exports = router;
