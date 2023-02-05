const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "volume",
  description: "Alter the volume",
  public: true,
  options: [
    {
      name: "percent",
      description: "10 = 100%",
      type: "NUMBER",
      required: true,
    },
  ],

  async execute(interaction, client) {
    const { options, member, guild, channel } = interaction;
    const VoiceChannel = member.voice.channel;

    if(!VoiceChannel)
    return interaction.reply({content: "You must be in a voice channel to be able to use the music commands.", ephemeral: true});
    if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
    return interaction.reply({content: `I'm arleady playing music in <#${guild.me.voice.channelId}>,`, ephemeral: true});

    const Volume = options.getNumber("percent");
    if (Volume > 100 || Volume < 1)
      return interaction.reply({
        content: "You have to specify a number between 1 and 100",
      });

    client.distube.setVolume(VoiceChannel, Volume);
    return interaction.reply({
      content: `📶 Volume has been set to \`${Volume}%\``,
    });
  },
};
