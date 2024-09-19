const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const rest = new REST({version: '9'}).setToken(client.token);

		client.user.presence.set({
			activities: [{name: 'Developed by memte.', type: 'LISTENING'}],
		});

		client.log(`${client.user.username} Aktif Edildi!`);
		//
		try {
			await rest.put(
				Routes.applicationCommands(client.user.id),
				{body: client.slashDatas},
			);
		} catch (error) {
			console.error(error);
		}
	},
};
