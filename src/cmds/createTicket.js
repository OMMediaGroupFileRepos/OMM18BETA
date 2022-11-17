const { SlashCommandBuilder, ChannelType, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
    category: "support",
    data: new SlashCommandBuilder()
        .setName("create")
        .setDescription("Allows you to create a supportticket!")
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Add a reason why you want support.")
                .setRequired(true)),
    async execute(client, interaction) {

        const category = config.ticketCat;

        var user = interaction.user.username;
        var userDiscr = interaction.user.tag;

        const reason = await interaction.options.getString("reason");

        var ticketExists = false;

        interaction.guild.channels.cache.forEach(channel => {
            if (channel.name === user.toLowerCase() + "-" + userDiscr) {
                interaction.reply(`\`\`\ diff\n- You already have an ticket opened!  \`\`\``)
                ticketExists = true;
                return;
            }
        });

        if (ticketExists) return;

        interaction.guild.channels.create({ name: user.toLowerCase() + "-" + userDiscr, type: ChannelType.GuildText , parent: category}).then(
            (ticketChannel) => {

                ticketChannel.permissionOverwrites.edit(interaction.guild.roles.cache.find(x => x.name === "@everyone"), {
 
                    SendMessages: false,
                    ViewChannel: false
                 
                });
                 
                ticketChannel.permissionOverwrites.edit(interaction.user.id, {
                    CreateInstantInvite: false,
                    ReadMessageHistory: true,
                    SendMessages: true,
                    AttachFiles: true,
                    Connect: true,
                    AddReactions: true,
                    ViewChannel: true
                });
                 
                ticketChannel.permissionOverwrites.edit(interaction.guild.roles.cache.find(x => x.name === "support"), {
                    CreateInstantInvite: false,
                    ReadMessageHistory: true,
                    SendMessages: true,
                    AttachFiles: true,
                    Connect: true,
                    AddReactions: true,
                    ViewChannel: true
                });
                 
                var embed = new EmbedBuilder()
                .setTitle("Ticket")
                .addFields(
                    {name: "Reason", value: reason},
                    {name: "User", value: userDiscr}
                )
                
                ticketChannel.send({ embeds: [embed] });

            }
        )

        interaction.reply({content: "```Ticket created!```", ephemeral: true})

    },
};