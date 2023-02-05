const glob = require('glob');
const { Client } = require("discord.js")
const { devGuildId } = require(`${process.cwd()}/Structures/config.json`)

module.exports = (client) => {
    /**
    * @param {Client} client
     */
    const public_CommandsArray = [];
    const dev_CommandsArray = [];
 
    glob(`${(process.cwd().replace(/\\/g, "/"))}/Commands/**/**/*.js`, function(err, files) {
        files.map(async (file) => {
            const command = require(file);

            if(!command.name) {
                delete require.cache[require.resolve(file)];
                return console.log(`${file.split("/").pop()} does not have a command name! Removing the command.`)
            }

            if(command.public) {
                public_CommandsArray.push(command);
                console.log(`Loaded ${command.name.toUpperCase()} from ${file.split("/").pop()}`)
            } else {
                dev_CommandsArray.push(command);
                console.log(`Loaded ${command.name.toUpperCase()} from ${file.split("/").pop()}`)
            }
            
            client.commands.set(command.name, command);
            delete require.cache[require.resolve(file)];
        });

        client.on("ready", async () => {
            client.publicCommands = public_CommandsArray;
            const guild = client.guilds.cache.get(devGuildId);
            const guild2 = client.guilds.cache
            if(guild) {
                await guild.commands.set(dev_CommandsArray);
                console.log(`${client.user.tag} | Loaded ${dev_CommandsArray.length} developer commands`);
            }
            if(guild2) {
                guild2.forEach((g) => {g.commands.set(public_CommandsArray)});
            }
            console.log(`${client.user.tag} | Loaded ${public_CommandsArray.length} global commands`);
        });
    });
}