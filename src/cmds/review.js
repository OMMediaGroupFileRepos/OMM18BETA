const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "general",
    data: new SlashCommandBuilder()
        .setName(l.review)
        .setDescription(l.reviewDesc)
        .addStringOption(option =>
            option.setName(l.reviewOptionOne)
            .addChoices(
                { name: "⭐", value: "⭐" },
                { name: "⭐⭐", value: "⭐⭐" },
                { name: "⭐⭐⭐", value: "⭐⭐⭐" },
                { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
                { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" }

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
        if (amount == "⭐⭐⭐⭐⭐") color = "#3E7243";
        if (amount == "⭐⭐⭐⭐") color = "#75A778";
        if (amount == "⭐⭐⭐") color = "#E2AD31";
        if (amount == "⭐⭐") color = "#CD6831";
        if (amount == "⭐") color = "#E14B40";

        let embed = new EmbedBuilder()
            .setTitle(stars)
            .addFields(
                { name: l.reviewWhy, value: `*${msg}*` }
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: interaction.user.tag })
            .setColor(color)
            .setTimestamp()

        await channel.send({ embeds: [embed] })
        await interaction.reply({content: `\`\`\`diff\n+ ${l.reviewSent}\`\`\``, ephemeral: true})

    },
};