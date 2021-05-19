var express = require('express');
var router = express.Router();
let Users = require('../model/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/login', async(req, res) => {
    let email = req.body.email,
        senha = req.body.password;

    var res2 = await Users.login(email, senha);

    if (res2) {
        res.status(200).send({ token: "5ad578qea5ds4" });
    } else {
        res.status(400).send({ error: "Login failed" });
    }
});


module.exports = router;