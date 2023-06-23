const { Events, InteractionType } = require("discord.js");

 module.exports = {
	name: Events.InteractionCreate,
	execute: async(interaction) => {
         let client = interaction.client;
   	 if (interaction.type == InteractionType.ApplicationCommand) {
   	 if(interaction.user.bot) return;
	try {
         const command = client.slashcommands.get(interaction.commandName)
         command.run(client, interaction)
	} catch (e) {
        console.error(e)
	interaction.reply({content: "Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.", ephemeral: true})
	}
	 }
  }}
