const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);
const embeds = require(`../data/embedSettings.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName(l.ping)
        .setDescription(l.pingDesc),
    async execute(client, interaction) {

        let embed = new EmbedBuilder()
        .setTitle("PONG!")
            .addFields(
                { name: `${client.user.username}${l.pingCmd_1}`, value: `\`\`\`${Date.now() - interaction.createdTimestamp}ms\`\`\`` },
                { name: l.pingCmd_2, value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\`` }
            )
            .setFooter({ text: config.footer })
            .setColor(embeds.color.default)
            .setTimestamp()

        await interaction.reply({embeds: [embed], ephemeral: true})
    },
};