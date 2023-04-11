const { SlashCommandBuilder } = require("discord.js");
const config = require("../data/config.json");
const { ask } = require("../../ai.js");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName("ask")
        .setDescription("Ask the bot a question.")
        .addStringOption(option =>
            option.setName("input")
                .setDescription("Enter your question here")
                .setRequired(true)),
    async execute(client, interaction) {
        
        const answer = await ask(prompt); //prompt GPT-3

        await interaction.reply({ content: answer, ephemeral: true }); // stuur het antwoord terug naar de gebruiker
    },
};