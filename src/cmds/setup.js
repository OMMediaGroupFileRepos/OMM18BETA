const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");
const config = require("../data/config.json");
const { exec } = require('child_process');
const fs = require("fs").promises;
const path = require("path");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "general",
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("set the bot up (this command can be executed all time, even when already set up)")
        .addStringOption(option =>
            option.setName("language")
                .addChoices(
                    { name: "English", value: "en" },
                    { name: "German/Deutsch (DE)", value: "de" },
                    { name: "Dutch/Nederlands (NL)", value: "nl" },
                    { name: "Limburgs (NL-LI)", value: "nl_li" },
                    { name: "Brabants (NL-BR)", value: "nl_br" },
                    { name: "Flemish/Vlaams (BE-VL)", value: "be_vl" },
                    { name: "French/Français (FR)", value: "fr" },
                    { name: "Ukrainian/Українська (UKR)", value: "ukr" },
                )
                .setDescription("set the language of the bot (selection)")
                .setRequired(true))
        .addChannelOption(option =>
            option.setName(`suggestions`)
                .setDescription(`set the suggestionschannel (id)`)
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
        .addChannelOption(option =>
            option.setName(`reviews`)
                .setDescription(`set the reviewchannel (id)`)
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
        .addChannelOption(option =>
            option.setName(`logs`)
                .setDescription(`set the logging channel (name)`)
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
        .addChannelOption(option =>
            option.setName(`supportcategory`)
                .setDescription(`support-ticket category (id)`)
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildCategory))
        .addRoleOption(option =>
            option.setName(`supportrole`)
                .setDescription(`default support role that will be used for the tickets (id)`)
                .setRequired(true))
        .addRoleOption(option =>
            option.setName(`joinrole`)
                .setDescription(`role that has been given at join (id)`)
                .setRequired(true))
        .addChannelOption(option =>
            option.setName(`welcomechannel`)
                .setDescription(`channel that the welcome message gets send to (id)`)
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText))
        .addStringOption(option =>
            option.setName(`guildname`)
                .setDescription(`guildname (name)`)
                .setRequired(true)),

    async execute(client, interaction) {

        let a = interaction.options.getString("language");
        let b = interaction.options.getChannel("suggestions").id;
        let c = interaction.options.getChannel("reviews").id;
        let d = interaction.options.getChannel("logs").id;
        let e = interaction.options.getChannel("supportcategory").id;
        let f = interaction.options.getRole("supportrole").name;
        let g = interaction.options.getRole("joinrole").name;
        let h = interaction.options.getChannel("welcomechannel").id;
        let i = interaction.options.getString("guildname");

        config.lang = a;
        config.reviewChannel = c;
        config.suggestChannel = b;
        config.ticketCat = e;
        config.logging = d;
        config.supportRole = f;
        config.joinRole = g;
        config.welcomeChannel = h;
        config.guildName = i;

    const configPath = path.join(__dirname, '../data/config.json');
try {
    await fs.writeFile(configPath, JSON.stringify(config, null, 4), 'utf8');
    console.log('Configuratie bijgewerkt!');
} catch (error) {
    console.error('Fout bij het bijwerken van configuratie:', error);
}
        interaction.reply({ content: `\`\`\`diff\n+ Done!\`\`\``, ephemeral: true })

        exec('bash reboot.sh')

    },
};