import {ActivityType, Events} from 'discord.js';
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v10';

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const rest = new REST({version: '10'}).setToken(client.token);

		client.user.presence.set({
			activities: [{name: 'Developed by memte.', type: ActivityType.Listening}],
		});

		client.logger.info(`${client.user.username} Active!`);
		//
		try {
			await rest.put(Routes.applicationCommands(client.user.id), {
				body: client.slashDatas,
			});
		} catch (error) {
			console.error(error);
		}
	},
};
