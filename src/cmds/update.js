const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const { exec } = require('child_process');
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName("update")
        .setDescription("updaten."),
    async execute(client, interaction) {

      let latest = new EmbedBuilder()
            .setTitle("Updating the bot...")
            .setDescription("**The bot is gonna update to a newer version of the code, if available.**\n\n`Execute````/updatelogs [LATEST]````to see what's new!`")
            .setFooter({ text: config.footer })
            //.setColor("#1111")
            .setTimestamp()

    await interaction.reply({ embeds: [bericht], ephemeral: true})


      exec('bash update.sh')
  },
};
