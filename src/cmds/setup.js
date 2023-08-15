const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
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
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
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
                .setRequired(false))
        .addChannelOption(option =>
            option.setName(`suggestions`)
                .setDescription(`set the suggestionschannel (id)`)
                .setRequired(false)
                .addChannelTypes(ChannelType.GuildText))
        .addChannelOption(option =>
            option.setName(`reviews`)
                .setDescription(`set the reviewchannel (id)`)
                .setRequired(false)
                .addChannelTypes(ChannelType.GuildText))
        .addChannelOption(option =>
            option.setName(`logs`)
                .setDescription(`set the logging channel (name)`)
                .setRequired(false)
                .addChannelTypes(ChannelType.GuildText))
        .addChannelOption(option =>
            option.setName(`supportcategory`)
                .setDescription(`support-ticket category (id)`)
                .setRequired(false)
                .addChannelTypes(ChannelType.GuildCategory))
        .addRoleOption(option =>
            option.setName(`supportrole`)
                .setDescription(`default support role that will be used for the tickets (id)`)
                .setRequired(false))
        .addRoleOption(option =>
            option.setName(`joinrole`)
                .setDescription(`role that has been given at join (id)`)
                .setRequired(false))
        .addChannelOption(option =>
            option.setName(`welcomechannel`)
                .setDescription(`channel that the welcome message gets send to (id)`)
                .setRequired(false)
                .addChannelTypes(ChannelType.GuildText))
        .addStringOption(option =>
            option.setName(`guildname`)
                .setDescription(`guildname (name)`)
                .setRequired(false)),


    async execute(client, interaction) {

        const prevLang = config.lang;
        const prevSug = config.suggestChannel;
        const prevRev = config.reviewChannel;
        const prevLog = config.logging;
        const prevTicket = config.ticketCat;
        const prevSupportRole = config.supportRole;
        const prevJoinRole = config.joinRole;
        const prevWelChannel = config.welcomeChannel;
        const prevGuildName = config.guildName; // Corrected to "guildName"

        const newLang = interaction.options.getString("language") || prevLang;
        const newSug = interaction.options.getChannel("suggestions")?.id || prevSug;
        const newRev = interaction.options.getChannel("reviews")?.id || prevRev;
        const newLog = interaction.options.getChannel("logs")?.id || prevLog;
        const newTicket = interaction.options.getChannel("supportcategory")?.id || prevTicket;
        const newSupportRole = interaction.options.getRole("supportrole")?.name || prevSupportRole;
        const newJoinRole = interaction.options.getRole("joinrole")?.name || prevJoinRole;
        const newWelChannel = interaction.options.getChannel("welcomechannel")?.id || prevWelChannel;
        const newGuildName = interaction.options.getString("guildname") || prevGuildName;

        config.lang = newLang;
        config.suggestChannel = newSug;
        config.reviewChannel = newRev;
        config.logging = newLog;
        config.ticketCat = newTicket;
        config.supportRole = newSupportRole;
        config.joinRole = newJoinRole;
        config.welcomeChannel = newWelChannel;
        config.guildName = newGuildName;

        const configPath = path.join(__dirname, '../data/config.json');
        try {
            await fs.writeFile(configPath, JSON.stringify(config, null, 4), 'utf8');
        } catch (error) {
            console.error('Fout bij het bijwerken van configuratie:', error);
        }
        interaction.reply({ content: `\`\`\`diff\n+ Done!\`\`\``, ephemeral: true });

        exec('bash reboot.sh');
    },
};
