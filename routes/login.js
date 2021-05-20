var express = require('express');
var router = express.Router();
let Users = require('../model/Users');

router.post('/', async(req, res) => {
    let email = req.body.email,
        senha = req.body.password;

    var user = await Users.findOne(email);
    if (user) {
        if (user.senha == senha) {
            req.session.login = user.email;
            req.session.admin = user.admin;
            res.status(200).send({ token: "QpwL5tke4Pnpja7X4", admin: user.admin });
        } else {
            res.status(400).send({ error: "Senha incorreta." });
        }
    } else {
        res.status(404).send({ error: "Usuario nao encontrado." });
    }
});

module.exports = router;