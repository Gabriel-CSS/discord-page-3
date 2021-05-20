var express = require('express');
var router = express.Router();

router.get('/busca', function(req, res) {
    if (req.session.login) {
        res.render('teste', { title: 'logado' });
    } else {
        res.render('teste2', { title: 'nao logado' });
    }
});

router.get('/post', function(req, res) {
    if (req.session.admin == 1 && req.session.login) {
        res.render('teste', { title: 'logado e admin' });
    } else {
        res.render('teste2', { title: 'nao logado ou nao admin' });
    }
});

module.exports = router;