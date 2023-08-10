const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "general",
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("set the bot up (this command can be executed all time, even when already set up)")
        .addStringOption(option =>
            option.setName(`language`)
                .setDescription(`choose the language`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`suggestions`)
                .setDescription(`set the suggestionschannel (id)`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`reviews`)
                .setDescription(`set the reviewchannel (id)`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`logs`)
                .setDescription(`set the logging channel (name)`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`supportcategory`)
                .setDescription(`support-ticket category (id)`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`supportrole`)
                .setDescription(`default support role (name)`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`joinrole`)
                .setDescription(`role that has been given at join (id)`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`welcomechannel`)
                .setDescription(`channel that the welcome message gets send to (id)`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`guildname`)
                .setDescription(`guildname (name)`)
                .setRequired(true)),

    async execute(client, interaction) {

        interaction.reply({ content: `\`\`\`diff\n+ Done!\`\`\``, ephemeral: true })


    },
};