const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const config = require("../data/config.json");
const pkg = require("../../package.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "general",
    data: new SlashCommandBuilder()
        .setName(l.updateLogs)
        .setDescription(l.updateLogsDesc)
        .addStringOption(option =>
            option.setName("update")
            .addChoices(
                { name: "Latest", value: "lat" },

            )
                .setDescription(l.starsDesc)
                .setRequired(true)),
    async execute(client, interaction) {

        var number = interaction.options.getString("update");

        var bericht = "";

        let latest = new EmbedBuilder()
            .setTitle("Latest update, (" + pkg.version + ")")
            .setDescription("**__What's new?__**\n\n```diff\n+ /update --> allows you to update the bot```\n** **\n```diff\n+ Fixed some styling```\n** **\n```diff\n+ Added Limburgs, Nederlands (Limburg)```\n")
            .setFooter({ text: config.footer })
            //.setColor("#1111")
            .setTimestamp()

        let embed = new EmbedBuilder()
            .setTitle("Update 1")
            .setDescription("**__What's new?__**\n\n```Zionbase? huh where's OMM3?\nWell, we've included OMM3 in the basic version of Zionbase! This new modern botbase of ZionMedia is made for you, the new Discord functions are included in this first version of Zionbase, and there's so much to tell about our new botbase!```\n\n```diff\n+ Slash commands are now the new prefix\n+ You can still get the prefix by using Zionbase Basic!\n+ Stability is better than ever\n+ Available for everyone, free.\n\nWe include our first commands in the next updates!\nWatch our for our next update.\n\n ~ ZionMedia```\n** **")
            .setFooter({ text: config.footer })
            .setTimestamp()

        let embedA = new EmbedBuilder()
            .setTitle("Update 2")
            .setDescription("**__What's new this time?__**\n\n```diff\n+ Suggestion command, you can now post suggestions!\n+ Reviews? No problem, we've added them!\n- Help command will dissapear or re-made```\n** **")
            .setFooter({ text: config.footer })
            .setTimestamp()

        let embedB = new EmbedBuilder()
            .setTitle("Update 3")
            .setDescription("**__What's new?__**\n\n```diff\n+ Updatelogs, it's now possible to view our updates, see what has been added in different updates.```\n** **")
            .setFooter({ text: config.footer })
            .setTimestamp()

            let embedC = new EmbedBuilder()
            .setTitle("Update 4")
           .setDescription("**__What's new?__**\n\n```diff\n+ Ticket open, you can now open tickets (English)\n+ Ticket close, of course close is also good to have (also English)\n+ Added logging system for tickets in English```\n** **")
            .setFooter({ text: config.footer })
            .setTimestamp()

            let embedD = new EmbedBuilder()
            .setTitle("Update 5")
           .setDescription("**__What's new?__**\n\n```diff\n+ Added Dutch and German to tickets\n- Removed Zionbase Basic```\n** **")
            .setFooter({ text: config.footer })
            .setTimestamp()

            let embedE = new EmbedBuilder()
            .setTitle("Update 6")
           .setDescription("**__What's new?__**\n\n```diff\n ```\n** **")
            .setFooter({ text: config.footer })
            .setTimestamp()

            let embedF = new EmbedBuilder()
            .setTitle("Update 1")
           .setDescription("**__What's new?__**\n\n```diff\n ```\n** **")
            .setFooter({ text: config.footer })
            .setTimestamp()

            let embedG = new EmbedBuilder()
            .setTitle("Update 1")
           .setDescription("**__What's new?__**\n\n```diff\n ```\n** **")
            .setFooter({ text: config.footer })
            .setTimestamp()

            let embedH = new EmbedBuilder()
            .setTitle("Update 1")
           .setDescription("**__What's new?__**\n\n```diff\n ```\n** **")
            .setFooter({ text: config.footer })
            .setTimestamp()

            let embedI = new EmbedBuilder()
            .setTitle("Update 1")
           .setDescription("**__What's new?__**\n\n```diff\n ```\n** **")
            .setFooter({ text: config.footer })
            .setTimestamp()

        if(number == "lat") bericht = latest;
        if(number == "zero") bericht = embed;
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