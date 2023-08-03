const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../data/config.json");
const { exec } = require("child_process");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName("changes")
        .setDescription(l.pingDesc),
    async execute(client, interaction) {

        const commitHashes = exec('git log --pretty=format:"%H" origin/main..HEAD').toString().trim().split('\n');
        let formattedMessages = [];

        for (const commitHash of commitHashes) {
            const commitInfo = exec(`git log -1 --pretty="format:%ad%n%B" --date="format:%A %d %B at %H:%M" ${commitHash}`).toString();
            const commitMessage = commitInfo.split('\n\n')[1];
            const commitTitle = commitInfo.split('\n\n')[0];
            const commitDate = commitInfo.split('\n\n')[2];

            const change = {
                title: commitTitle,
                date: commitDate,
                description: commitMessage
            };

            formattedMessages.push(change);
        }

        let embed = new EmbedBuilder()
            .setTitle("Recent Changes")
            .setColor("#80ddd9")
            .setTimestamp();

        for (const change of formattedMessages) {
            embed.addField(change.date, `**${change.title}**\n${change.description}`);
        }

        embed.setFooter({ text: config.footer });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
