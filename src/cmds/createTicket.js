const { SlashCommandBuilder, ChannelType, EmbedBuilder, Embed } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "support",
    data: new SlashCommandBuilder()
        .setName(l.ticketCreate)
        .setDescription(l.ticketCreateDesc)
        .addStringOption(option =>
            option.setName(l.ticketCreateReason)
                .setDescription(l.ticketCreateReasonDesc)
                .setRequired(true)),
    async execute(client, interaction) {

        const category = config.ticketCat;

        var user = interaction.user.username;
        const userDiscr = interaction.user.tag;

        const reason = await interaction.options.getString(l.ticketReason);

        var ticketExists = false;

        interaction.guild.channels.cache.forEach(channel => {
            if (channel.name === interaction.user.tag.toLowerCase()) {
                interaction.reply(`\`\`\ diff\n- ${l.ticketAlreadyOpened}  \`\`\``)
                ticketExists = true;
                return;
            }
        });

        if (ticketExists == "true") return;

        interaction.guild.channels.create({ name: userDiscr.toLowerCase(), type: ChannelType.GuildText , parent: category}).then(
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
                 
                ticketChannel.permissionOverwrites.edit(interaction.guild.roles.cache.find(x => x.name === config.supportRole), {
                    CreateInstantInvite: false,
                    ReadMessageHistory: true,
                    SendMessages: true,
                    AttachFiles: true,
                    Connect: true,
                    AddReactions: true,
                    ViewChannel: true
                });
                 
                var embed = new EmbedBuilder()
                .setTitle("**__" + l.ticketLogName + "__**")
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    {name: l.ticketReason, value: reason},
                    {name: l.ticketUser, value: userDiscr}
                )
                .setColor("#95B96C")
                .setFooter({ text: config.footer })
                .setTimestamp()
                
                ticketChannel.send({ embeds: [embed] });

            }
        )

        interaction.reply({content: "```" + l.ticketCreated + "```", ephemeral: true})

        var embed = new EmbedBuilder()
            .setTitle("**__" + l.ticketMadeTitle + "__**")
            .setDescription(`${l.ticketCreateReasonText}: **${reason}**\n${l.ticketCreatedBy}: **${interaction.user.tag}**`)
            .setFooter({ text: l.ticketProvidedBy + " " + config.watermark_nostamp })
            .setColor("#5C8D93")
            .setTimestamp();

        var ticketChannel = interaction.member.guild.channels.cache.find(channel => channel.name === config.logging);

        if (!ticketChannel) interaction.reply("```diff" + l.logsDoNotExist + "\n```");

        ticketChannel.send({ embeds: [embed] })

    },
};