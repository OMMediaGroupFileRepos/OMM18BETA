const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const config = require("../data/config.json");
const pkg = require("../../package.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);
const embeds = require(`../data/embedSettings.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName(l.updateLogs)
        .setDescription(l.updateLogsDesc)
        .addStringOption(option =>
            option.setName(l.updateLogsSelect)
            .addChoices(
                { name: "Latest", value: "lat" },
                { name: "8th", value: "g" },
                { name: "7th", value: "f" },
                { name: "6th", value: "e" },
                { name: "5th", value: "d" },
                { name: "4th", value: "c" },
                { name: "3th", value: "b" },
                { name: "2nd", value: "a" },
                { name: "1st", value: "first" },
            )
                .setDescription(l.starsDesc)
                .setRequired(true)),
    async execute(client, interaction) {

        var number = interaction.options.getString("update");

        var bericht = "";

        let latest = new EmbedBuilder()
            .setTitle("Latest update (" + pkg.version + ")")
            .setDescription("**__What's new?__**\n\n```diff\n/config\n```\n\n** **")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

        let embed = new EmbedBuilder()
            .setTitle("Update 1")
            .setDescription("**__What's new?__**\n\n```Zionbase? huh where's OMM3?\nWell, we've included OMM3 in the basic version of Zionbase! This new modern botbase of ZionMedia is made for you, the new Discord functions are included in this first version of Zionbase, and there's so much to tell about our new botbase!```\n\n```diff\n+ Slash commands are now the new prefix\n+ You can still get the prefix by using Zionbase Basic!\n+ Stability is better than ever\n+ Available for everyone, free.\n\nWe include our first commands in the next updates!\nWatch our for our next update.\n\n ~ ZionMedia```\n** **")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

        let embedA = new EmbedBuilder()
            .setTitle("Update 2")
            .setDescription("**__What's new this time?__**\n\n```diff\n+ Suggestion command, you can now post suggestions!\n+ Reviews? No problem, we've added them!\n- Help command will dissapear or re-made```\n** **")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

        let embedB = new EmbedBuilder()
            .setTitle("Update 3")
            .setDescription("**__What's new?__**\n\n```diff\n+ Updatelogs, it's now possible to view our updates, see what has been added in different updates.```\n** **")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

            let embedC = new EmbedBuilder()
            .setTitle("Update 4")
           .setDescription("**__What's new?__**\n\n```diff\n+ Ticket open, you can now open tickets (English)\n+ Ticket close, of course close is also good to have (also English)\n+ Added logging system for tickets in English```\n** **")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

            let embedD = new EmbedBuilder()
            .setTitle("Update 5")
           .setDescription("**__What's new?__**\n\n```diff\n+ Added Dutch and German to tickets\n- Removed Zionbase Basic```\n** **")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

            let embedE = new EmbedBuilder()
            .setTitle("Update 6")
            .setDescription("**__What's new?__**\n\n```diff\n+ /update --> allows you to update the bot trough our reposities```\n** **\n```diff\n+ Fixed styling```\n** **\n```diff\n+ Added Limburgs, Dutch (Limburgs)```\n")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

            let embedF = new EmbedBuilder()
            .setTitle("Update 7")
            .setDescription("**__What's new?__**\n\n```diff\n+ Changed versions back to an easy to understand name```\n```+ Extended maintaining plans will be public soon```\n** **")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

            let embedG = new EmbedBuilder()
            .setTitle("Update 8")
           .setDescription("**__What's new?__**\n\n```diff\nAdded the following languages:\n+ Vlaams (Belgium)\n+ French (France)\n+ Brabants (Netherlands)\n+ Ukrainian (Ukraine)\n```\n\n** **")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

            let embedH = new EmbedBuilder()
            .setTitle("Update 1")
           .setDescription("**__What's new?__**\n\n```diff\n ```\n** **")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

            let embedI = new EmbedBuilder()
            .setTitle("Update 1")
           .setDescription("**__What's new?__**\n\n```diff\n ```\n** **")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.updateLogs)
            .setTimestamp()

        if(number == "lat") bericht = latest;
        if(number == "first") bericht = embed;
        if(number == "a") bericht = embedA;
        if(number == "b") bericht = embedB;
        if(number == "c") bericht = embedC;
        if(number == "d") bericht = embedD;
        if(number == "e") bericht = embedE;
        if(number == "f") bericht = embedF;
        if(number == "g") bericht = embedG;
        if(number == "h") bericht = embedH;
        if(number == "i") bericht = embedI;
        
        await interaction.reply({embeds: [bericht], ephemeral: true})

    },
};