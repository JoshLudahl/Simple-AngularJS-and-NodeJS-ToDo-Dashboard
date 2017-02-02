var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {

    response.render('pages/contact');
});

module.exports = router;
