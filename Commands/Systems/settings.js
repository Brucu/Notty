const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "settings",
  description: "Select an option",
  public: true,
  options: [
    {
      name: "options",
      description: "Select an option.",
      type: "STRING",
      required: true,
      choices: [
        { name: "⏭ Skip Song", value: "skip" },
        { name: "⏸ Pause Music", value: "pause" },
        { name: "⏩ Resume Music", value: "resume" },
        { name: "⏹ Stop Music", value: "stop" },
        { name: "🔀 Shuffle Queue", value: "shuffle" },
        { name: "🔁 Toogle Autoplay Modes", value: "AutoPlay" },
        { name: "🈁 Add a Related Song", value: "RelatedSong" },
        { name: "🔁 Toogle Repeat Mode", value: "RepeatMode" },
      ],
    },
  ],

  async execute(interaction, client) {
    const { options, member, guild, channel } = interaction;
    const VoiceChannel = member.voice.channel;

    if (!VoiceChannel)
      return interaction.reply({
        content:
          "You must be in a voice channel to be able to use the music commands.",
        ephemeral: true,
      });
    if (
      guild.me.voice.channelId &&
      VoiceChannel.id !== guild.me.voice.channelId
    )
      return interaction.reply({
        content: `I'm arleady playing music in <#${guild.me.voice.channelId}>,`,
        ephemeral: true,
      });

    const queue = await client.distube.getQueue(VoiceChannel);

    if (!queue) return interaction.reply({ content: "⛔ There is no queue" });

    switch (options.getString("options")) {
      case "skip":
        if (!queue) return interaction.reply({ content: "⛔ There is no queue" });
        await queue.skip(VoiceChannel);
        return interaction.reply({ content: "⏭ Song has been skipped." });

      case "stop":
        await queue.stop(VoiceChannel);
        return interaction.reply({ content: "⏹ Music has been stopped." });

      case "pause":
        await queue.pause(VoiceChannel);
        return interaction.reply({ content: "⏸ Song has been paused." });

      case "resume":
        await queue.resume(VoiceChannel);
        return interaction.reply({ content: "⏯ Song has been paused." });

      case "shuffle":
        await queue.shuffle(VoiceChannel);
        return interaction.reply({
          content: "🔀 The queue has been shuffled.",
        });

      case "AutoPlay":
        let Mode = await queue.toggleAutoplay(VoiceChannel);
        return interaction.reply({
          content: `🔁 Autoplay Mode is set to: ${Mode ? "On" : "Off"}`,
        });

      case "RelatedSong":
        await queue.addRelatedSong(VoiceChannel);
        return interaction.reply({
          content: "🈁 A related song has been added to the queue.",
        });

      case "RepeatMode":
        let Mode2 = await client.distube.setRepeatMode(queue);
        return interaction.reply({
          content: `🔁 Repeat Mode is set to: ${(Mode2 = Mode2
            ? Mode2 == 2
              ? "Queue"
              : "Song"
            : "Off")}`,
        });
    }
  },
};
