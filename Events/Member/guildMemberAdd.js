const { MessageEmbed, WebhookClient, GuildMember} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        
        const { user, guild} = member;

        const Welcomer = new WebhookClient({
            id: "981310451944157265",
            token: "5BYHIKNrDXHnV81-j8PseVfRfgSLjZmilIimcueYjuM4A93ttvK-bzVl-UetFkWrR_eK"
        });

        const Welcome = new MessageEmbed()
        .setColor("DARK_RED")
        .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome ${member} to the **${guild.name}**!\n
        Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter(`ID: ${user.id}`)

        Welcomer.send({embeds: [Welcome]})
    }
}