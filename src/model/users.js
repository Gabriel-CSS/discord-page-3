const { MongoClient } = require('mongodb');

module.exports = class Users {
    static async find() {
        const conn = await MongoClient.connect('mongodb://localhost:27017')
        const db = conn.db('discordDB');
        return await db.collection('users').find().toArray();
    }

    static async login(emails, senhas) {
        const conn = await MongoClient.connect('mongodb://localhost:27017')
        const db = conn.db('discordDB');

        var user = await db.collection('users').findOne({ email: emails });
        conn.close();

        if (user) {
            if (user.senha == senhas)
                return true;
        }

        return false;
    }
}