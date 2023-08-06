const { SlashCommandBuilder, MessageEmbed } = require("discord.js");
const fs = require("fs");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName("addcommand")
        .setDescription("add a custom command.")
        .addStringOption(option => option.setName("command").setDescription("The custom command name").setRequired(true))
        .addStringOption(option => option.setName("code").setDescription("The JavaScript code for the custom command").setRequired(true)),
    async execute(client, interaction) {
        if (interaction.user.id !== '1075422974477340742') {
            return interaction.reply({ content: "You are not authorized to use this command.", ephemeral: true });
        }

        const command = interaction.options.getString("command").toLowerCase();
        const code = interaction.options.getString("code");

        try {
            // Controleer of de src/custom map bestaat, zo niet, maak deze dan aan
            //if (!fs.existsSync("./src/custom")) {
             //   fs.mkdirSync("./src/custom");
            //}

            const filePath = `../src/cmds/${command}.js`;

            // Controleer of het commando al bestaat
            if (fs.existsSync(filePath)) {
                return interaction.reply({ content: `The command "${command}" already exists.`, ephemeral: true });
            }

            // Sla de code op als .js bestand in de ./src/custom map
            fs.writeFileSync(filePath, code);

            // Voer de code uit de customCommands.js bestand opnieuw uit (optioneel)
           // require(filePath);

            interaction.reply({ content: `Custom command "${command}" added successfully.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "Failed to add your custom command: " + command, ephemeral: true });
        }
    },
};
