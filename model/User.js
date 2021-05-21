const { MongoClient } = require('mongodb');
const uri = require('../config/db');

module.exports = class Users {

    static async findOne(emails) {
        const conn = await MongoClient.connect(uri.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = conn.db('discordDB');
        return await db.collection('users').findOne({ email: emails });
    }

    static async register(nomes, emails, senhas) {
        const conn = await MongoClient.connect(uri.mongoURI);
        const db = conn.db('discordDB');

        var user = await db.collection('users').findOne({ email: emails });
        if (user)
            return false;

        await db.collection('users').insertOne({
            nome: nomes,
            email: emails,
            senha: senhas,
            admin: "false"
        });

        return true;
    }
}