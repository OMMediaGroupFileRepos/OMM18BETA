const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { exec } = require('child_process');
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);
const embeds = require(`../data/embedSettings.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName("update")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDescription("updaten."),
    async execute(client, interaction) {

      let latest = new EmbedBuilder()
            .setTitle("**Updating the bot...**\n** **\n")
            .setDescription("**`Execute the command below to see what's new!`**\n```/updatelogs update:Latest```\n** **\n*NOTE!*\n**The bot will check for changes and restarts, it might not change anything if there are no changes, we recommend you to follow our updates we announce in our official support server.**\n** **\n")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.success)
            .setTimestamp()

    await interaction.reply({ embeds: [latest], ephemeral: true})


      exec('bash update.sh')
  },
};
