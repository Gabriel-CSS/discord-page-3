const { MongoClient } = require('mongodb');
const uri = require('../config/db');

module.exports = class Series {
    static async find(nomes) {
        const conn = await MongoClient.connect(uri.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = conn.db('discordDB');
        var users;

        if (nomes.length > 2) {
            users = await db.collection('series').find({ nome: new RegExp(nomes) }).toArray();
            conn.close();
            return users;
        } else {
            users = await db.collection('series').find().toArray();
            conn.close();
            return users;
        }
    }

    static async post(nome, estreia, site, genero, imdb, emissora, pais, sinopse, imagem) {
        const conn = await MongoClient.connect(uri.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = conn.db('discordDB');

        await db.collection('series').insertOne({
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
        return conn.close();
    }
}