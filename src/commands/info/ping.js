import {EmbedBuilder, PermissionsBitField} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';

export const commandBase = {
	prefixData: {
		name: 'ping',
		aliases: ['pong'],
	},
	slashData: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	// Komutu geliştirmek istersen guide: https://discordjs.guide/slash-commands/advanced-creation.html
	cooldown: 5000, // 1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
	ownerOnly: false, // Komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
	async prefixRun(client, message, args) {
		message.reply('Pong 🏓');
	},
	async slashRun(client, interaction) {
		interaction.reply('Pong 🏓');
	},
};
