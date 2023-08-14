const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);
const embeds = require(`../data/embedSettings.json`);

module.exports = {
    category: "general",
    data: new SlashCommandBuilder()
        .setName(l.review)
        .setDescription(l.reviewDesc)
        .addStringOption(option =>
            option.setName(l.reviewOptionOne)
            .addChoices(
                { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" },
                { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
                { name: "⭐⭐⭐", value: "⭐⭐⭐" },
                { name: "⭐⭐", value: "⭐⭐" },
                { name: "⭐", value: "⭐" },
                { name: "❌", value: "❌"},
            )
                .setDescription(l.starsDesc)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(l.reviewOptionTwo)
                .setDescription(l.reviewMsgDesc)
                .setRequired(true)),

    async execute(client, interaction) {

        let amount = interaction.options.getString(l.reviewOptionOne);
        let channel = client.channels.cache.get(config.reviewChannel);
        if (!channel) console.log(l.reviewChannelInvalid);

        var msg = interaction.options.getString(l.reviewOptionTwo);
        const stars = await interaction.options.getString(l.reviewOptionOne);

        var color = "";
        if (amount == "⭐⭐⭐⭐⭐") color = embeds.color.revA;
        if (amount == "⭐⭐⭐⭐") color = embeds.color.revB;
        if (amount == "⭐⭐⭐") color = embeds.color.revC;
        if (amount == "⭐⭐") color = embeds.color.revD;
        if (amount == "⭐") color = embeds.color.revE;
        if (amount == "❌") color = embeds.color.revF;

        let embed = new EmbedBuilder()
            .setTitle(stars)
            .setDescription("\n```" + msg + "```")
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: "Review by " + interaction.user.username })
            .setColor(color)
            .setTimestamp()

        await channel.send({ embeds: [embed] })
        await interaction.reply({content: `\`\`\`diff\n+ ${l.reviewSent}\`\`\``, ephemeral: true})

    },
};