import {readdirSync} from 'node:fs';

export default {
	async execute(client) {
		const eventFiles = readdirSync('./src/events');

		Promise.all(eventFiles.map(async file => {
			const event = await import(`../events/${file}`).then(x => x.default);

			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		}));

		// Process Listeners
		process.on('unhandledRejection', e => {
			console.log(e);
		});
		process.on('uncaughtException', e => {
			console.log(e);
		});
		process.on('uncaughtExceptionMonitor', e => {
			console.log(e);
		});
	},
};
