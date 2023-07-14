const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../data/config.json");
const fs = require("fs").promises;
const { exec } = require("child_process");

        module.exports = {
            category: "information",
            data: new SlashCommandBuilder()
                .setName("release")
                .setDescription("iets")
                .addStringOption(option =>
                    option.setName("version")
                        .addChoices(
                            { name: "stable", value: "stable" },
                            { name: "beta", value: "beta" },
                        )
                        .setDescription("iets")
                        .setRequired(true)),
            async execute(client, interaction) {
        const selectedVersion = interaction.options.getString("version");

        let repositoryUrl = "";
        let versionName = "";
        if (selectedVersion === "stable") {
            repositoryUrl = "git+https://github.com/OMMediaGroupFileRepos/OMM18";
            versionName = "stable";
        } else if (selectedVersion === "beta") {
            repositoryUrl = "git+https://github.com/OMMediaGroupFileRepos/OMM18BETA";
            versionName = "beta";
        }

        // Bijwerken van package.json met de nieuwe repository-URL
        try {
            const packageJsonPath = "./package.json";
            const packageJson = await fs.readFile(packageJsonPath, "utf-8");
            const parsedPackageJson = JSON.parse(packageJson);
            parsedPackageJson.repository.url = repositoryUrl;
            await fs.writeFile(packageJsonPath, JSON.stringify(parsedPackageJson, null, 2));
            console.log("Package.json bijgewerkt met nieuwe repository-URL:", repositoryUrl);

            let embed = new EmbedBuilder()
                .setTitle("Repository veranderd naar " + versionName)
                .setFooter({ text: config.footer })
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
