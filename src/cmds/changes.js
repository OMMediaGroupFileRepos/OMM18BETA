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
            let formattedMessages = "";

            for (const commitHash of commitHashes) {
                const commitInfo = execSync(`git log -1 --pretty="format:%ad%n%B" --date="format:%A %d %B at %H:%M" ${commitHash}`).toString();
                formattedMessages += commitInfo + '\n\n';
            }

            return formattedMessages.trim() || "Geen updates beschikbaar";
        }

        const updates = getFormattedCommitMessages();

        let embed = new EmbedBuilder()
            .setTitle("PONG!")
            .setDescription("```" + updates + "```")
            .setFooter({ text: config.footer })
            .setColor("#80ddd9")
            .setTimestamp()

        await interaction.reply({ embeds: [embed], ephemeral: true })
    },
};
