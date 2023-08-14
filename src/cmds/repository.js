const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../data/config.json");
const embeds = require(`../data/embedSettings.json`);
const fs = require("fs").promises;
const { exec } = require("child_process");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

        module.exports = {
            category: "information",
            data: new SlashCommandBuilder()
                .setName(l.repository)
                .setDescription(l.repoDesc)
                .addStringOption(option =>
                    option.setName(l.repository)
                        .addChoices(
                            { name: l.stable, value: "stable" },
                            { name: l.beta, value: "beta" },
                            { name: l.extra, value: "extra"},
                        )
                        .setDescription(l.selectRepo)
                        .setRequired(true)),
            async execute(client, interaction) {
        const selectedVersion = interaction.options.getString(l.repository);

        let repositoryUrl = "";
        let versionName = "";
        if (selectedVersion === "stable") {
            repositoryUrl = "https://github.com/OMMediaGroupFileRepos/OMM18";
            versionName = l.stable;
        } else if (selectedVersion === "beta") {
            repositoryUrl = "https://github.com/OMMediaGroupFileRepos/OMM18BETA";
            versionName = l.beta;
        } else if (selectedVersion === "extra") {
            repositoryUrl = "https://github.com/OMMediaGroupFileRepos/OMM18BETA";
            versionName = l.extra;
        }

        // Bijwerken van package.json met de nieuwe repository-URL
        try {
            const packageJsonPath = "./package.json";
            const packageJson = await fs.readFile(packageJsonPath, "utf-8");
            const parsedPackageJson = JSON.parse(packageJson);
            parsedPackageJson.repository.url = repositoryUrl;
            await fs.writeFile(packageJsonPath, JSON.stringify(parsedPackageJson, null, 2));
            console.log("Repository changed to:", versionName);

            exec('git remote set-url origin ' + repositoryUrl)

            let embed = new EmbedBuilder()
                .setTitle(l.repoChanged + versionName)
                .setDescription(l.updateBotRepo)
                .addFields(
                    { name: l.completeMigration, value: "```/update```"}
                )
                .setFooter({ text: config.footer })
                .setColor(embeds.color.success)
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });

            // Herstarten van de bot
            setTimeout(() => {
                exec("pm2 restart main.js", (error, stdout, stderr) => {
                    if (error) {
                        console.error("Er is een fout opgetreden bij het herstarten van de bot met PM2:", error);
                    } else {
                        console.log("Bot wordt herstart met PM2.");
                    }
                });
            }, 7000);
        } catch (error) {
            console.error("Er is een fout opgetreden bij het bijwerken van het package.json-bestand:", error);
        }
    },
};
