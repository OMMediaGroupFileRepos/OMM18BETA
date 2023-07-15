const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const fs = require("fs").promises;
const config = require("../data/config.json");
const { exec } = require("child_process");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName(l.lang)
        .setDescription(l.langEditDesc)
        .addStringOption(option =>
            option.setName(l.langOption)
                .addChoices(
                    { name: "English (EN)", value: "en" },
                    { name: "Nederlands (NL)", value: "nl" },
                    { name: "Limburgs (NL-LI)", value: "nl_li" },
                    { name: "Deutsch (DE)", value: "de" },
                    { name: "Vlaams (BE-VL)", value: "be_vl" },
                )
                .setDescription(l.langOptionsDesc)
                .setRequired(true)),
    async execute(client, interaction) {
        var lang = "";
        var number = interaction.options.getString(l.langOption);

        var selectedLang = "";

        if (number == "en") selectedLang = "en";
        if (number == "nl") selectedLang = "nl";
        if (number == "nl_li") selectedLang = "nl_li";
        if (number == "de") selectedLang = "de";
        if (number == "be_vl") selectedLang = "be_vl";

        if (selectedLang == "en") lang = "English";
        if (selectedLang == "nl") lang = "Nederlands";
        if (selectedLang == "nl_li") lang = "Limburgs";
        if (selectedLang == "de") lang = "Deutsch";
        if (selectedLang == "be_vl") lang = "Vlaams";

        config.lang = selectedLang;

        try {
            await fs.writeFile("./src/data/config.json", JSON.stringify(config, null, 4));
            console.log(l.langUpdatedTextConsole + lang);

            langUpdatedText = "";

            if (selectedLang == "en") langUpdatedText = l.langUpdatedTo;
            if (selectedLang == "nl") langUpdatedText = l.langUpdatedTo;
            if (selectedLang == "nl_li") langUpdatedText = l.langUpdatedTo;
            if (selectedLang == "de") langUpdatedText = l.langUpdatedTo;
            if (selectedLang == "be_vl") langUpdatedText = l.langUpdatedTo;

            let embed = new EmbedBuilder()
                .setTitle(langUpdatedText + lang)
                .setFooter({ text: config.footer })
                .setColor("#4fdd6e")
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });

            setTimeout(() => {
                exec("pm2 restart main.js", (error, stdout, stderr) => {
                    if (error) {
                        console.error(l.errorRestarting, error);
                    } else {
                        console.log(l.restartingConsoleMsg);
                    }
                });
            }, 3000);
        } catch (error) {
            console.error(l.errorChangingConfig, error);
        }
    },
};
