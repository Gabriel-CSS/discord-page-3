var express = require('express');
var router = express.Router();
let Users = require('../model/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;