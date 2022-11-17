const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
    category: "moderation",
    data: new SlashCommandBuilder()
        .setName("close")
        .setDescription("Close supportticket!")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(client, interaction) {

        const category = "1039192461794365462";

        if (interaction.channel.parentId == category) {
            interaction.channel.delete();
        } else {
            await interaction.reply("```diff\n- Please execute this in ticket channels only!```");
            return;
        }

        var embed = new EmbedBuilder()
            .setTitle("Ticket " + interaction.channel.name + " has been closed!")
            .setFooter({ text: interaction.user.tag })
            .setColor("#5C8D93")
            .setTimestamp();

        var ticketChannel = interaction.member.guild.channels.cache.find(channel => channel.name === "logging");

        if (!ticketChannel) interaction.reply("```diff\nLogchannel doesn't exists!```");

        ticketChannel.send({ embeds: [embed] })

    },
};