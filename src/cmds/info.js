const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);
const embeds = require(`../data/embedSettings.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .setDescription(l.pingDesc),
    async execute(client, interaction) {

        langName = "";

        if (config.lang == "en") langName = "English (EN)";
        if (config.lang == "nl") langName = "Nederlands (Dutch/NL)";
        if (config.lang == "nl_li") langName = "Limburgs (Dialect of Limburg, Dutch/NL-LI)";
        if (config.lang == "de") langName = "Deutsch (German/DE)";
        if (config.lang == "be_vl") langName = "Vlaams (Belgium/BE-VL)";
        if (config.lang == "nl_br") langName = "Brabants (Dialect of Noord-Brabant, Dutch/NL-BR)";
        if (config.lang == "ukr") langName = "Українська (Ukraine/UKR)";
        if (config.lang == "fr") langName = "Français (French/FR)";
        if (config.lang == "pl") langName = "Polish (Poland/PL)";

        let embed = new EmbedBuilder()
        .setTitle("Information about `" + client.user.username + "` on ***" + config.guildName + "***")
            .addFields(
                { name: `Language`, value: langName, inline: true },
                { name: `Suggestions are being sent to`, value: `<#${config.suggestChannel}>`, inline: true },
                { name: `Reviews are being sent to`, value: `<#${config.reviewChannel}>`, inline: true},
                { name: `Logs are being sent to`, value: `<#${config.logging}>`, inline: true},
                { name: `Tickets will be made at the category`, value: `<#${config.ticketCat}>`, inline: true},
                { name: `Permissions in tickets will be granted to`, value: `@${config.supportRole}`, inline: true},
                { name: `New members will get the role`, value: `@${config.joinRole}`, inline: true},
                { name: `New members will be welcomed with an message in`, value: `<#${config.welcomeChannel}>`, inline: true},
                { name: `The bot will know this server as`, value: config.guildName, inline: true },
                { name: config.guildName + `'s serverid is`, value: config.guild, inline: true},
                { name: client.user.username + `'s id is`, value: config.id, inline: true},
            )
            .setFooter({ text: config.footer })
            .setColor(embeds.color.default)
            .setTimestamp()

        await interaction.reply({embeds: [embed], ephemeral: true})
    },
};