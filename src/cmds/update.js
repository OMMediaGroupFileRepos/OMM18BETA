const { SlashCommandBuilder } = require("discord.js");
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

    await interaction.reply({ content: "Processing update, check updatelogs [latest] for current version.", ephemeral: true})

      exec('git pull origin main')
      exec('npm install')
      exec('pm2 restart main.js')
  },
};
