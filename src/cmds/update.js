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
        
      exec('git pull origin main && npm install && pm2 restart main.js')
  },
};
