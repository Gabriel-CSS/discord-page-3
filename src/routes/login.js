var express = require('express');
var router = express.Router();
let Users = require('../model/Users');

router.post('/', async(req, res) => {
    let email = req.body.email,
        senha = req.body.password;

    var result = await Users.login(email, senha);

    if (result) {
        req.session.login = result;
        res.status(200).send({ token: "QpwL5tke4Pnpja7X4" });
    } else {
        res.status(400).send({ error: "Login failed" });
    }
});

module.exports = router;