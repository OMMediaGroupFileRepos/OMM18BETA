const { SlashCommandBuilder } = require("discord.js");
const { exec } = require('child_process');

module.exports = {
    category: "information",
    data: new SlashCommandBuilder()
        .setName("update")
        .setDescription(l.pingDesc),
    async execute(client, interaction) {
    try {
      // Execute the shell script
      exec('../../update.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return interaction.reply({ content: 'Failed to update the bot', ephemeral: true });
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        interaction.reply({ content: 'Bot updated successfully', ephemeral: true });
      });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Failed to update the bot\n' + `\`\`\`${error}\`\`\``, ephemeral: true });
    }
  },
};
