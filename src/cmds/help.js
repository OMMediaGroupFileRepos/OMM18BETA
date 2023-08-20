const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

var response = "**Commands**";
var general = "***__General__***";
var information = "***__Information__***";
var moderation = "***__Moderation__***";
var fun = "***__Fun__***";
var owner = "***__Owner__***";

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName(l.help)
        .setDescription(l.helpDesc),
        /*.addStringOption(option =>
            option.setName("test")
                .addChoices(
                    { name: "General", value: general },
                    { name: "Information", value: information },
                    { name: "Moderation", value: moderation },
                    { name: "Fun", value: fun },
                    { name: "Owner", value: owner }

                )
                .setDescription("test")
                .setRequired(true)),*/

    async execute(client, interaction) {

        var response = "# Commands";
        var general = "## General\n";
        var information = "## Information\n";
        var support = "## Support\n";
        var moderation = "## Moderation\n";
        var fun = "## Fun\n";
        var owner = "## Owner\n";

        client.commands.forEach(cmd => {
            switch (cmd.category) {

                case "general":
                    general += `/${cmd.data.name} | ${cmd.data.description}\n`
                    break;

                case "information":
                    information += `/${cmd.data.name} | ${cmd.data.description}\n`
                    break;

                case "moderation":
                    moderation += `/${cmd.data.name} | ${cmd.data.description}\n`
                    break;

                case "fun":
                    fun += `/${cmd.data.name} | ${cmd.data.description}\n`
                    break;

                case "owner":
                    owner += `/${cmd.data.name} | ${cmd.data.description}\n`
            }
        });

        //const option = await interaction.options.getString("test");

        var res = response + "\n" + general + "\n" + information + "\n" + support + "\n" + moderation + "\n" + fun + "\n" + owner;

        

        interaction.reply({ content: `${res}`, ephemeral: true })
        //interaction.reply({content: l.notAvailable, ephemeral: true})

    },
};