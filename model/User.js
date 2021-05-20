const { MongoClient } = require('mongodb');

module.exports = class Users {
    static async find() {
        const conn = await MongoClient.connect('mongodb://localhost:27017');
        const db = conn.db('discordDB');
        return await db.collection('users').find().toArray();
    }

    static async findOne(emails) {
        const conn = await MongoClient.connect('mongodb://localhost:27017');
        const db = conn.db('discordDB');
        return await db.collection('users').findOne({ email: emails });
    }

    static async register(nomes, emails, senhas) {
        const conn = await MongoClient.connect('mongodb://localhost:27017');
        const db = conn.db('discordDB');

        var user = await db.collection('users').findOne({ email: emails });
        if (user)
            return false;

        await db.collection('users').insertOne({
            nome: nomes,
            email: emails,
            senha: senhas,
            admin: false
        });
        conn.close();

        return true;
    }
}