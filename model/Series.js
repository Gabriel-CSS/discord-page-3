const { MongoClient } = require('mongodb');
const uri = require('../config/db');

module.exports = class Series {
    static async find(nome) {
        const conn = await MongoClient.connect(uri.mongoURI);
        const db = conn.db('discordDB');

        if (nome.length > 2)
            return await db.collection('series').find({ nome: nome }).toArray();
        else
            return await db.collection('series').find().toArray();
    }

    static async post(nome, estreia, site, genero, imdb, emissora, pais, sinopse) {
        const conn = await MongoClient.connect(uri.mongoURI);
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
            sinopse: sinopse
        });
    }
}