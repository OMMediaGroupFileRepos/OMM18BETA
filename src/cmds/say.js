const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, InteractionType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRow, ActionRowBuilder  } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);

module.exports = {
    category: "general",
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("iets")
        //.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption(option =>
            option.setName("type")
            .addChoices(
                { name: "Message", value: "msg" },
                { name: "Embed", value: "emb" }

            )
                .setDescription("Select the type of message you want to send")
                .setRequired(true)),
/*
                .addStringOption(option =>
                    option.setName("message")
                        .setDescription("Write your message here (:")
                        .setRequired(true))

        .addStringOption(option =>
            option.setName("title")
                .setDescription("Write your title here, if embed (:"))

                .addStringOption(option =>
                    option.setName("color")
                        .setDescription("Add a color for your embed, when selected.")),
*/
    async execute(client, interaction) {

        if(interaction.options.getString("type") == "emb"){

            var title = "smth"
        var color = "#fff"

        if(title == "") title = "** **";
        if(color == "") color = "#fff";

        let embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(interaction.options.getString("message"))
            .setFooter({ text: config.footer })
            .setColor(interaction.options.getString("color"))
            .setTimestamp()

            const modal = new ModalBuilder()
        .setTitle("Choose your embed options here!")
        .setCustomId("welcome")
        .setComponents(
            new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                .setLabel("title")
                .setCustomId("sayTitle")
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
            ),
            new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                .setLabel("color")
                .setCustomId("sayColor")
                .setStyle(TextInputStyle.Short)
            ),

            new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                .setLabel("message")
                .setCustomId("sayMsg")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
            ),

            

        );

        await interaction.showModal(modal);
        await interaction.followUp({content: "iets"})
        }

        if(interaction.options.getString("type") == "msg"){

            var title = "smth"
        var color = "#fff"

        if(title == "") title = "** **";
        if(color == "") color = "#fff";

            const modal = new ModalBuilder()
        .setTitle("Welcome to the say command! (MSG)")
        .setCustomId("welcome")
        .setComponents(

            new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                .setLabel("message")
                .setCustomId("sayMsg")
                .setStyle(TextInputStyle.Paragraph)
            ),

        );

        await interaction.showModal(modal);
        //await interaction.followUp(console.log(
            //interaction.fields.getTextInputValue("message")))
        //interaction.followUp({content: `\`\`\`diff\n+ Done!\n+ A popup will appear, you can choose your options there.\`\`\``, ephemeral: true})

        if (!interaction.isModalSubmit()) return;
            await interaction.reply({ content: 'Your submission was received successfully!' });
        

        if(InteractionType == InteractionType.ModalSubmit){
            var input = interaction.fields.getTextInputValue("message")
        await interaction.send({content: input})
        }}

    },
    
};