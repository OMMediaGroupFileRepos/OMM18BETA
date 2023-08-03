const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../data/config.json");
const { execSync } = require("child_process");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName("changes")
        .setDescription(l.pingDesc),
    async execute(client, interaction) {

        function getFormattedCommitMessages() {
            const commitHashes = execSync('git log --pretty=format:"%H" origin/main..HEAD').toString().trim().split('\n');
            let formattedMessages = [];

            for (const commitHash of commitHashes) {
                const commitInfo = execSync(`git log -1 --pretty="format:%ad%n%B" --date="format:%A %d %B at %H:%M" ${commitHash}`).toString();
                const commitMessage = commitInfo.split('\n\n')[1]; // Haal alleen het commitbericht op
                const commitDate = commitInfo.split('\n\n')[0]; // Haal alleen de datum op

                const change = {
                    title: "**" + commitDate + "**",
                    value: commitMessage
                };

                formattedMessages.push(change);
            }

            return formattedMessages.length > 0 ? formattedMessages : [{ title: "Geen updates beschikbaar", value: "" }];
        }

        const updates = getFormattedCommitMessages();

        let embed = new EmbedBuilder()
            .setTitle("PONG!")
            .setDescription(updates + "\n\n**Notice,** ***you may already installed this update.***")
            .setFooter({ text: config.footer })
            .setColor("#80ddd9")
            .setTimestamp()

        await interaction.reply({ embeds: [embed], ephemeral: true })
    },
};
