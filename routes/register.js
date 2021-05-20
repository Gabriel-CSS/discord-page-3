var express = require('express');
var router = express.Router();
let Users = require('../model/User');
let Validator = require('../model/validator');

router.post('/', async(req, res) => {
    let nome = req.body.nome,
        email = req.body.email,
        senha = req.body.password;

    if (await Validator.registerValidator(nome, email, senha))
        var result = await Users.register(nome, email, senha);
    else
        return res.status(400).send({ error: "Dados invalidos" });

    if (result) {
        req.session.login = result;
        return res.status(200).send({ token: "QpwL5tke4Pnpja7X4" });
    } else {
        return res.status(400).send({ error: "Este email ja existe" });
    }
});

module.exports = router;