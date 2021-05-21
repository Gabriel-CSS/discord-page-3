var express = require('express');
var router = express.Router();
let Series = require('../model/Series');
const multer = require("multer");

router.get('/busca', async(req, res) => {
    if (req.session.login) {
        var result = await Series.find(req.query.nome);
        return res.status(200).send(result);
    } else {
        return res.status(401).send({ error: "Usuário não logado." });
    }
});

router.post('/post', async(req, res) => {
    var upload = null;
    var filePath, fileNewName;
    try {
        var path = require('path');
        var storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, 'public/uploads/');
            },
            filename: function(req, file, cb) {
                fileExtension = file.originalname.split('.')[1];
                fileNewName = require('crypto').randomBytes(16).toString('hex') + path.extname(file.originalname);
                filePath = '../uploads/' + fileNewName;
                cb(null, fileNewName);
            }
        });

        upload = multer({ storage: storage }).fields([
            { name: 'imagem', maxCount: 1 }
        ]);
    } catch (ex) {
        console.log("error");
    }

    upload(req, res, async err => {
        if (err) {
            console.log("Upload error");
        }

        let nome = req.body.nome,
            estreia = req.body.estreia,
            site = req.body.site,
            genero = req.body.genero,
            imdb = req.body.imdb,
            emissora = req.body.emissora,
            pais = req.body.pais,
            sinopse = req.body.sinopse,
            imagem = filePath;

        if (nome.length > 3) {
            await Series.post(nome, estreia, site, genero, imdb, emissora, pais, sinopse, imagem);
        } else {
            return res.status(400).send({ error: "Ao menos um nome você precisa inserir para publicar alguma coisa, né?" });
        }

        return res.status(200).send({ message: "Conteudo publicado com sucesso." });
    });
    // if (req.session.admin && req.session.login) {
    //     let nome = req.body.nome,
    //         estreia = req.body.estreia,
    //         site = req.body.site,
    //         genero = req.body.genero,
    //         imdb = req.body.imdb,
    //         emissora = req.body.emissora,
    //         pais = req.body.pais,
    //         sinopse = req.body.sinopse,
    //         imagem = req.body.imagem;

    //     if (nome.length > 3) {
    //         await Series.post(nome, estreia, site, genero, imdb, emissora, pais, sinopse, imagem);
    //     } else {
    //         return res.status(400).send({ error: "Ao menos um nome você precisa inserir para publicar alguma coisa, né?" });
    //     }

    //     return res.status(200).send({ message: "Conteudo publicado com sucesso." });
    // } else {
    //     return res.status(403).send({ error: "Usuário não possui permissão para publicar." });
    // }
});

module.exports = router;