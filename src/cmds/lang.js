const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const fs = require("fs").promises;
const config = require("../data/config.json");
const { exec } = require("child_process");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName("lang")
        .setDescription("iets")
        .addStringOption(option =>
            option.setName("update")
                .addChoices(
                    { name: "English (EN)", value: "en" },
                    { name: "Nederlands (NL)", value: "nl" },
                    { name: "Limburgs (NL-LI)", value: "nl_li" },
                    { name: "Deutsch (DE)", value: "de" },
                )
                .setDescription(l.starsDesc)
                .setRequired(true)),
    async execute(client, interaction) {
        var taal = "";
        var number = interaction.options.getString("update");

        var selectedLang = "";

        if (number == "en") selectedLang = "en";
        if (number == "nl") selectedLang = "nl";
        if (number == "nl_li") selectedLang = "nl_li";
        if (number == "de") selectedLang = "de";

        if (selectedLang == "en") taal = "English";
        if (selectedLang == "nl") taal = "Nederlands";
        if (selectedLang == "nl_li") taal = "Limburgs";
        if (selectedLang == "de") taal = "Deutsch";

        config.lang = selectedLang;

        try {
            await fs.writeFile("./src/data/config.json", JSON.stringify(config, null, 4));
            console.log("Taalinstellingen zijn bijgewerkt.");

            let embed = new EmbedBuilder()
                .setTitle("Language changed to " + taal)
                .setFooter({ text: config.footer })
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });

            setTimeout(() => {
                exec("pm2 restart main.js", (error, stdout, stderr) => {
                    if (error) {
                        console.error("Er is een fout opgetreden bij het herstarten van de bot met PM2:", error);
                    } else {
                        console.log("Bot wordt herstart met PM2.");
                    }
                });
            }, 3000);
        } catch (error) {
            console.error("Er is een fout opgetreden bij het bijwerken van het config.json-bestand:", error);
        }
    },
};
