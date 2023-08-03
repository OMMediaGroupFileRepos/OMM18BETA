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

        function getFormattedCommitMessages() {
            const commitHashes = exec('git log --pretty=format:"%H" origin/main..HEAD').toString().trim().split('\n');
            let formattedMessages = [];

            for (const commitHash of commitHashes) {
                const commitInfo = exec(`git log -1 --pretty="format:%ad%n%B" --date="format:%A %d %B at %H:%M" ${commitHash}`).toString();
                const commitMessage = commitInfo.split('\n\n')[1]; // Haal alleen het commitbericht op
                const commitDate = commitInfo.split('\n\n')[0]; // Haal alleen de datum op

                const change = {
                    title: "**" + commitDate + "**",
                    value: commitMessage
                };

                formattedMessages.push(change);
            }

            let embed = new EmbedBuilder()
            .setTitle(commitDate)
            .addFields(
                { name: commitTitle, value: commitMessage },
        )
            .setFooter({ text: config.footer })
            .setColor("#80ddd9")
            .setTimestamp()

         interaction.reply({ embeds: [embed], ephemeral: true })

            //return formattedMessages.length > 0 ? formattedMessages : [{ title: "No content available", value: "" }];
        }

        //const changes = getFormattedCommitMessages();
    },
};
