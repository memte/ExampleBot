const { InteractionType } = require("discord.js");
module.exports = {
  name: 'interactionCreate',
  execute: async(interaction) => {
  try {
      let client = interaction.client;
      if (interaction.type == InteractionType.ApplicationCommand) {
        const command = client.commands.get(interaction.commandName)
        if(!command) return;
        command.run(client, interaction);
      }
  } catch(e) {
     interaction.reply({ content: "Komut çalıştırılamadı :/", ephemeral: true });
     console.log(e);
  }
}}
