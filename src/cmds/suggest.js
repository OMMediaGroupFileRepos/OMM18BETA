const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "general",
    data: new SlashCommandBuilder()
        .setName(l.suggest)
        .setDescription(l.suggestDesc)
        .addStringOption(option =>
            option.setName(`${l.suggestOptionOne}`)
                .setDescription(`${l.suggestMsgDesc}`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`${l.suggestOptionTwo}`)
                .setDescription(`${l.suggestWhy}`)
                .setRequired(true)),

    async execute(client, interaction) {

        let channel = client.channels.cache.get(config.suggestChannel);
        if (!channel) console.log("[FAILED] suggestions channel is invalid");

        let embed = new EmbedBuilder()
            /*.setTitle("This command is not completed yet!")
            .setDescription("This will be completed ASAP!")
            .setThumbnail("https://cdn.discordapp.com/attachments/952109062676418580/1034796699933212802/logo_zion.png")
            //.setImage("https://cdn.discordapp.com/attachments/952109062676418580/1034796699933212802/logo_zion.png")
            .addFields(
                { name: "Meer informatie", value: "tja idk wat hier moet :joy:" },
                { name: `Botnaam`, value: `${client.user.username}` },
                { name: `Botnaam + tag`, value: `${client.user.tag}` },
        )*/
            .setTitle(`${l.suggestTitle} ${interaction.user.username}`)
            .setDescription(interaction.options.getString(l.suggestOptionOne))
            .addFields(
                { name: l.suggestWhyToAdd, value: interaction.options.getString(l.suggestOptionTwo) }
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: config.footer })
            .setColor("#4C878D")
            .setTimestamp()

        await channel.send({ embeds: [embed] })

        interaction.reply({content: `\`\`\`diff\n+ ${l.suggestSent}\`\`\``, ephemeral: true})


    },
};