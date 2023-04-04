const { SlashCommandBuilder, Embed, EmbedBuilder } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName("whenis")
        .setDescription("iets")
        .addStringOption(option =>
            option.setName("option")
            .addChoices(
                { name: "Christmas", value: "a" },
                { name: "St. Patrick's Day", value: "b" },
                { name: "New year", value: "c" }

            )
            .setDescription("Option")
                .setRequired(true)),
    async execute(client, interaction) {
    
        let option = interaction.options.getString("option");

        if (option == "a"){
            var today = new Date();
        let year = today.getFullYear();

        let christmas = new Date(`25 December, 2022`);
        let left = (christmas.getTime() - today.getTime());

        let daysLeft = Math.floor(left / (1000 * 60 * 60 * 24));
        let hoursLeft = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((left % (1000 * 60)) / 1000);

        let days = "days";
        if(daysLeft == 1)
        {
            days = "day";
        }
        let minutes = "minutes";
        if(minutesLeft == 1)
        {
            minutes = "minute";
        }
        let hours = "hours";
        if(hoursLeft == 1)
        {
            hours = "hour";
        }

        if(daysLeft < 0 && hoursLeft < 0 && minutesLeft < 0 && secondsLeft < 0){

          
            await interaction.reply("Hmm, it looks like it's christmas today, happy christmas days!")


        } else {

            let embed = new EmbedBuilder()
            .setTitle("When is christmas?")
            .setDescription(`It's christmas in ${daysLeft} ${days}, ${hoursLeft} hour, ${minutesLeft} and ${secondsLeft} seconds!`)
            .setFooter({text: config.footer})


                await interaction.reply({embeds: [embed]})


        }
    }

    if (option == "a"){
        var today = new Date();
    let year = today.getFullYear();

    let christmas = new Date(`25 December, 2022`);
    let left = (christmas.getTime() - today.getTime());

    let daysLeft = Math.floor(left / (1000 * 60 * 60 * 24));
    let hoursLeft = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutesLeft = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((left % (1000 * 60)) / 1000);

    let days = "days";
    if(daysLeft == 1)
    {
        days = "day";
    }
    let minutes = "minutes";
    if(minutesLeft == 1)
    {
        minutes = "minute";
    }
    let hours = "hours";
    if(hoursLeft == 1)
    {
        hours = "hour";
    }

    if(daysLeft < 0 && hoursLeft < 0 && minutesLeft < 0 && secondsLeft < 0){

      
        await interaction.reply("Hmm, it looks like it's christmas today, happy christmas days!")


    } else {

        let embed = new EmbedBuilder()
        .setTitle("When is christmas?")
        .setDescription(`It's christmas in ${daysLeft} ${days}, ${hoursLeft} hour, ${minutesLeft} and ${secondsLeft} seconds!`)
        .setFooter({text: config.footer})


            await interaction.followUp({embeds: [embed]})


    }
}
if (option == "b"){

        var today = new Date();
        let year = today.getFullYear();

        let christmas = new Date(`17 Maart, 2022`);
        let left = (christmas.getTime() - today.getTime());

        let daysLeft = Math.floor(left / (1000 * 60 * 60 * 24));
        let hoursLeft = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((left % (1000 * 60)) / 1000);

        let days = "days";
        if(daysLeft == 1)
        {
            days = "day";
        }
        let minutes = "minutes";
        if(minutesLeft == 1)
        {
            minutes = "minute";
        }
        let hours = "hours";
        if(hoursLeft == 1)
        {
            hours = "hour";
        }

        if(daysLeft < 0 && hoursLeft < 0 && minutesLeft < 0 && secondsLeft < 0){

          
            await interaction.reply("Hmm, it looks like it's St. Patrick's Day today, happy St. Patrick's day!")


        } else {

            let embed = new EmbedBuilder()
            .setTitle("When is it St. Patrick's Day?")
            .setDescription(`It's new year in ${daysLeft} ${days}, ${hoursLeft} hour, ${minutesLeft} and ${secondsLeft} seconds!`)
            .setFooter({text: config.footer})


                await interaction.reply({embeds: [embed]})


        }
    }

    if (option == "c"){
        var today = new Date();
    let year = today.getFullYear();

    let christmas = new Date(`1 Januari, 2022`);
    let left = (christmas.getTime() - today.getTime());

    let daysLeft = Math.floor(left / (1000 * 60 * 60 * 24));
    let hoursLeft = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutesLeft = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((left % (1000 * 60)) / 1000);

    let days = "days";
    if(daysLeft == 1)
    {
        days = "day";
    }
    let minutes = "minutes";
    if(minutesLeft == 1)
    {
        minutes = "minute";
    }
    let hours = "hours";
    if(hoursLeft == 1)
    {
        hours = "hour";
    }

    if(daysLeft < 0 && hoursLeft < 0 && minutesLeft < 0 && secondsLeft < 0){

      
        await interaction.reply("Hmm, it looks like it's been new year, happy new year!")


    } else {

        let embed = new EmbedBuilder()
        .setTitle("When is it new year?")
        .setDescription(`It's new year in ${daysLeft} ${days}, ${hoursLeft} hour, ${minutesLeft} and ${secondsLeft} seconds!`)
        .setFooter({text: config.footer})


            await interaction.reply({embeds: [embed]})


    }
}

    },
};