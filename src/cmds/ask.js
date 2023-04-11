const { SlashCommandBuilder } = require("discord.js");
const config = require("../data/config.json");
const { openai } = require("openai");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

// configureer de OpenAI SDK
openai.api_key = "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";
console.log(openai.__version__);

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

    },
};