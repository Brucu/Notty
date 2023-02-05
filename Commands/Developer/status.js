const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
require("../../Events/Client/ready");

const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "status",
  permission: "ADMINISTRATOR",
  public: true,
  description: "Displays the status of the client and database connection",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const response = new MessageEmbed()
      .setTitle(`Client Status`)
      .setColor(`GREEN`)
      .addFields(
        {
          name: `<:icon_reply:962547429914337300> GENERAL`,
          value: `
                **\`•\` Client**: <:icon_online:970322600930721802> ONLINE
                **\`•\` Ping**: ${client.ws.ping}ms
                **\`•\` Uptime**: ${moment
                  .duration(parseInt(client.uptime))
                  .format(" D [days], H [hrs], m [mins], s [secs]")}
                `,
          inline: false,
        },
        {
          name: `<:icon_reply:962547429914337300> DATABASE`,
          value: `
                **\`•\` Connection**: ${switchTo(connection.readyState)}
                `,
          inline: true,
        }
      );

    interaction.reply({ embeds: [response] });
  },
};

function switchTo(val) {
  var status = " ";
  switch (val) {
    case 0:
      status = `🔴 DISCONNECTED`;
      break;
    case 1:
      status = `🟢 CONNECTED`;
      break;
    case 2:
      status = `🟠 CONNECTING`;
      break;
    case 3:
      status = `🟣 DISCONNECTING`;
      break;
  }
  return status;
}
