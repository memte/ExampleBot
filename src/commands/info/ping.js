const {MessageEmbed, Permissions} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

exports.commandBase = {
	prefixData: {
		name: 'ping',
		aliases: ['pong'],
	},
	slashData: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	// Komutu geliştirmek istersen guide: https://v13.discordjs.guide/interactions/slash-commands.html#options
	cooldown: 5000, // 1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
	ownerOnly: false, // Komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
	async prefixRun(client, message, args) {
		message.reply('Pong 🏓');
	},
	async slashRun(client, interaction) {
		interaction.reply('Pong 🏓');
	},
};
