import { InteractionType } from "discord.js";

 export default {
	name: 'interactionCreate',
	execute: async(interaction) => {
         let client = interaction.client;
   	 if (interaction.type == InteractionType.ApplicationCommand) {
   	 if(interaction.user.bot) return;
         const command = client.commands.get(interaction.commandName)
         command.run(client, interaction)
    }
  }}
