const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName(l.ping)
        .setDescription(l.pingDesc),
    async execute(client, interaction) {

        let embed = new EmbedBuilder()
        .setTitle("PONG!")
        .setImage("https://cdn.pixabay.com/photo/2016/03/31/15/35/bat-1293409_960_720.png")
            .addFields(
                { name: `${client.user.username}${l.pingCmd_1}`, value: `\`\`\`${Date.now() - interaction.createdTimestamp}ms\`\`\`` },
                { name: l.pingCmd_2, value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\`` }
            )
            .setFooter({ text: config.footer })
            .setTimestamp()

        await interaction.reply({embeds: [embed], ephemeral: true})
    },
};