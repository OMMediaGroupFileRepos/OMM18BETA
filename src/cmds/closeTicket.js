const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, Embed } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "moderation",
    data: new SlashCommandBuilder()
        .setName(l.ticketClose)
        .setDescription(l.ticketCloseDesc)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption(option =>
            option.setName(l.ticketCloseReason)
                .setDescription(l.ticketCloseReasonDesc)
                .setRequired(true)),
    async execute(client, interaction) {

        const category = config.ticketCat;
        const reason = await interaction.options.getString(l.ticketCloseReason);

        var userDiscr = interaction.user.tag;

        if (interaction.channel.parentId == category) {
            interaction.channel.delete();
        } else {
            await interaction.reply("```diff\n- " + executeInTicketCat + " ```");
            return;
        }

        var embed = new EmbedBuilder()
            .setTitle("**__Ticket " + interaction.channel.name + "__**")
            .setDescription(`${l.ticketClosingReason} **${reason}**\n${l.ticketClosedBy} **${interaction.user.tag}**\n${l.ticketMadeBy} **${interaction.channel.name}**`)
            .setFooter({ text: l.ticketProvidedBy + " " + config.watermark_nostamp })
            .setColor("#5C8D93")
            .setTimestamp();

        var ticketChannel = interaction.member.guild.channels.cache.find(channel => channel.name === config.logging);

        if (!ticketChannel) interaction.reply("```diff" + l.logsDoNotExist + "\n```");

        ticketChannel.send({ embeds: [embed] })

    },
};