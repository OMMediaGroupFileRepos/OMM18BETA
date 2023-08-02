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
                    { name: "English (United States)", value: "en_us" },
                    { name: "English (United Kingdom)", value: "en_uk" },
                    { name: "Deutsch (DE)", value: "de" },
                    { name: "Nederlands (NL)", value: "nl" },
                    { name: "Limburgs (NL-LI)", value: "nl_li" },
                    { name: "Brabants (NL-BR)", value: "nl_br" },
                    { name: "Vlaams (BE-VL)", value: "be_vl" },
                    { name: "French (FR)", value: "fr" },
                    { name: "Ukrainian (UKR)", value: "ukr" },
                )
                .setDescription(l.langOptionsDesc)
                .setRequired(true)),
    async execute(client, interaction) {
        
        var lang = "";
        var number = interaction.options.getString(l.langOption);
        var selectedLang = "";

        if (number == "en_us") selectedLang = "en_us";
        if (number == "en_uk") selectedLang = "en_uk";
        if (number == "nl") selectedLang = "nl";
        if (number == "nl_li") selectedLang = "nl_li";
        if (number == "de") selectedLang = "de";
        if (number == "be_vl") selectedLang = "be_vl";
        if (number == "nl_br") selectedLang = "nl_br";
        if (number == "ukr") selectedLang = "ukr";
        if (number == "fr") selectedLang = "fr";

        if (selectedLang == "en_us") lang = "English (US)";
        if (selectedLang == "en_uk") lang = "English (UK)";
        if (selectedLang == "nl") lang = "Nederlands";
        if (selectedLang == "nl_li") lang = "Limburgs";
        if (selectedLang == "de") lang = "Deutsch";
        if (selectedLang == "be_vl") lang = "Vlaams";
        if (selectedLang == "nl_br") lang = "Brabants";
        if (selectedLang == "ukr") lang = "Українська";
        if (selectedLang == "fr") lang = "Français";

        config.lang = selectedLang;
        try {
            await fs.writeFile("./src/data/config.json", JSON.stringify(config, null, 4));
            console.log(l.langUpdatedTextConsole + lang);

            langUpdatedText = "";
            const newL = require(`../lang/${selectedLang}.json`);
            console.log(newL)

            if (selectedLang == "en_us") langUpdatedText = newL.langUpdatedTo;
            if (selectedLang == "en_uk") langUpdatedText = newL.langUpdatedTo;
            if (selectedLang == "nl") langUpdatedText = newL.langUpdatedTo;
            if (selectedLang == "nl_li") langUpdatedText = newL.langUpdatedTo;
            if (selectedLang == "de") langUpdatedText = newL.langUpdatedTo;
            if (selectedLang == "be_vl") langUpdatedText = newL.langUpdatedTo;
            if (selectedLang == "nl_br") langUpdatedText = newL.langUpdatedTo;
            if (selectedLang == "ukr") langUpdatedText = newL.langUpdatedTo;
            if (selectedLang == "fr") langUpdatedText = newL.langUpdatedTo;

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
