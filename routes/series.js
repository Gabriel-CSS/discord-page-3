var express = require('express');
var router = express.Router();
let Series = require('../model/Series');

router.get('/busca', async(req, res) => {
    // if (req.session.login) {
    if (1 == 1) {
        var result = await Series.find(req.query.nome);
        return res.status(200).send(result);
    } else {
        return res.status(401).send({ error: "Usuário não logado." });
    }
});

router.post('/post', async(req, res) => {
    if (req.session.admin && req.session.login) {
        let nome = req.body.nome,
            estreia = req.body.estreia,
            site = req.body.site,
            genero = req.body.genero,
            imdb = req.body.imdb,
            emissora = req.body.emissora,
            pais = req.body.pais,
            sinopse = req.body.sinopse,
            imagem = req.body.imagem;

        if (nome.length > 3) {
            await Series.post(nome, estreia, site, genero, imdb, emissora, pais, sinopse, imagem);
        } else {
            return res.status(400).send({ error: "Ao menos um nome você precisa inserir para publicar alguma coisa, né?" });
        }

        return res.status(200).send({ message: "Conteudo publicado com sucesso." });
    } else {
        return res.status(403).send({ error: "Usuário não possui permissão para publicar." });
    }
});

module.exports = router;