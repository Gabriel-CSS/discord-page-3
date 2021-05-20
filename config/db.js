if (process.env.NODE_ENV == "producion") {
    module.exports = { mongoURI: "mongodb+srv://discordDB:yChJBgkxAM8HuDhw@clusterdiscord.g50kt.mongodb.net/discordDB?retryWrites=true&w=majority" };
} else {
    module.exports = { mongoURI: "mongodb://localhost:27017" };
}