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
        const question = interaction.options.getString("input"); // haal de vraag op van de gebruiker
        const response = await openai.completions.create({
            engine: "text-davinci-002", // kies het gewenste taalmodel
            prompt: question, // gebruik de vraag als prompt
            max_tokens: 1024,
            n: 1,
            stop: "\n",
        });
        const answer = response.choices[0].text.trim(); // haal het antwoord uit de respons van de API
        await interaction.reply({ content: answer, ephemeral: true }); // stuur het antwoord terug naar de gebruiker
    },
};