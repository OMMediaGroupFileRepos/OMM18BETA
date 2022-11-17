const { SlashCommandBuilder } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName(l.ping)
        .setDescription(l.pingDesc),
    async execute(client, interaction) {
        await interaction.reply("🏓")
        await interaction.followUp(`\`\`\`${l.pingCmd_1} ${Date.now() - interaction.createdTimestamp}ms. ${l.pingCmd_2} ${Math.round(client.ws.ping)}ms\`\`\``)
    },
};