import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';

export default {
	name: 'ready',
	once: true,
	async execute(client) {
		const rest = new REST({version: '9'}).setToken(client.token);

		client.user.presence.set({
			activities: [{name: 'Developed by memte.', type: 'LISTENING'}],
		});

		client.log(`${client.user.username} Active!`);
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
