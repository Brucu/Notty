const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "emitt",
    description: "Event emitter",
    public: false,
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "member",
            description: "Guild Member Events",
            type: "STRING",
            require: true,
            choices: [ 
                {
                    name: "guildMemberAdd",
                    value: "guildMemberAdd"
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const choices = interaction.options.getString("member");

        switch(choices){
            case "guildMemberAdd" : {
                client.emit("guildMemberAdd", interaction.member)
                interaction.reply({content: "Emitted the event.", ephemeral: true})
            }
            break;
        }
    }
}