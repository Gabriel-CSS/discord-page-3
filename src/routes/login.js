var express = require('express');
var router = express.Router();
let Users = require('../model/Users');

router.post('/', async(req, res) => {
    let email = req.body.email,
        senha = req.body.senha;

    var response = await Users.login(email, senha);

    console.log("==login  " + response);

    res.json(response);
});

module.exports = router;