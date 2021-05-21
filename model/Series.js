const { MongoClient } = require('mongodb');
const uri = require('../config/db');

module.exports = class Series {
    static async find(nome) {
        const conn = await MongoClient.connect(uri.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = conn.db('discordDB');

        if (nome.length > 2) {
            var all = await db.collection('series').find().toArray();
            var users = all.filter(function(item) {
                return item.nome.toLowerCase().includes(nome.toLowerCase());
            });
            return users;
        } else {
            return await db.collection('series').find().toArray();
        }
    }

    static async post(nome, estreia, site, genero, imdb, emissora, pais, sinopse, imagem) {
        const conn = await MongoClient.connect(uri.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = conn.db('discordDB');

        return await db.collection('series').insertOne({
            nome: nome,
            estreia: estreia,
            site: site,
            estreia: estreia,
            genero: genero,
            imdb: imdb,
            emissora: emissora,
            pais: pais,
            sinopse: sinopse,
            imagem
        });
    }
}