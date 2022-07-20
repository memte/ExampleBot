const { EmbedBuilder, InteractionType } = require("discord.js");
const { readdirSync } = require("fs");
const { owner } = require("../../config.js");
const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));

 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
  let client = interaction.client;
   if (!interaction.type == InteractionType.ApplicationCommand) return;
   if(interaction.user.bot) return;

	for (const file of commandFiles) {
        const command = require(`../../src/commands/${file}`);
        if(interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
        command.run(client, interaction)
    }
	}
  }}
