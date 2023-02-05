const { Client, Collection } = require("discord.js");
require('dotenv').config();
const { Token } = require("./config.json");
const client = new Client({intents: 32767});
const { promisify } = require("util")
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.publicCommands = [];
client.devCommands = [];
client.commands = new Collection();
client.publicCommands = new Collection();

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()],
    youtubeDL: false
});
module.exports = client;

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
});

client.login(Token).then(() => {
    console.log("Client logged in as " + client.user.tag)
}).catch((error) => {
    console.log(err)
});