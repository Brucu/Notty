const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  description: "Show the queue",
  public: true,

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const { options, member, guild, channel } = interaction;
    const VoiceChannel = member.voice.channel;

    if(!VoiceChannel)
    return interaction.reply({content: "You must be in a voice channel to be able to use the music commands.", ephemeral: true});
    if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
    return interaction.reply({content: `I'm arleady playing music in <#${guild.me.voice.channelId}>,`, ephemeral: true});

    const queue = await client.distube.getQueue(VoiceChannel);
    if (!queue) return interaction.reply({ content: "⛔ There is no queue" });

    return interaction.reply({embeds: [new MessageEmbed()
        .setColor("DARK_VIVID_PINK")
        .setDescription(`${queue.songs.map(
             (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
        )]});
  },
};
