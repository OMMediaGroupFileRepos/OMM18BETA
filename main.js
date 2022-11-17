const { Client, GatewayIntentBits, Collection, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const path = require("node:path");
const fs = require("node:fs");
const pkg = require("./package.json");

const config = require("./src/data/config.json");
const clientData = require("../data/clients.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const cmds = [];

let clientName = config.client;
var token = clientData[clientName];

client.once("ready", () => {

    console.log(`-- ${pkg.LTSC} --`);
    console.log(`-=- ${client.user.tag} -=-`);

    let guild = config.guild;
    let id = config.id;

    const rest = new REST({ version: 10 }).setToken(token);
    rest.put(Routes.applicationGuildCommands(id, guild), { body: cmds })
        .then(() => console.log(`[DONE] registered slash commands`))
        .catch(console.error);

});

const cmdsPath = path.join(__dirname, "src/cmds");
const files = fs.readdirSync("./src/cmds/").filter(file => file.endsWith(".js"));

for (const file of files) {
    const filePath = path.join(cmdsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    cmds.push(command.data.toJSON());

    console.log(`[LOADED] ${command.data.name}`);

}

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName)

    if (!command) return;

    try {
        await command.execute(client, interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "```Whoops, there was an error executing this command, please contact OfficieelMika#7371```", ephemeral: true });
    }
})

client.login(token);