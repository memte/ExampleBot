import {MessageEmbed, Permissions} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';

export const commandBase = {
	prefixData: {
		name: 'ping',
		aliases: ['pong'],
	},
	slashData: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	// If you want to improve the command, check the guide: https://v13.discordjs.guide/interactions/slash-commands.html#options
	cooldown: 5000, // 1 second = 1000 ms / set to 0 if you don't want a cooldown.
	ownerOnly: false, // Set to true if you want the command to be usable only by the developer.
	async prefixRun(client, message, args) {
		message.reply('Pong 🏓');
	},
	async slashRun(client, interaction) {
		interaction.reply('Pong 🏓');
	},
};
