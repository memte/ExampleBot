import config from '../config.js';
import {Collection} from 'discord.js';
const cooldown = new Collection();

export default {
	name: 'messageCreate',
	async execute(message) {
		const {client} = message;
		if (message.author.bot) {
			return;
		}

		if (message.channel.type === 'DM') {
			return;
		}

		const {prefix} = config;
		if (!message.content.startsWith(prefix)) {
			return;
		}

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		if (cmd.length === 0) {
			return;
		}

		let command = client.commands.get(cmd);
		command ||= client.commands.get(client.commandAliases.get(cmd));

		if (command) {
			if (command.cooldown) {
				const nowDate = message.createdTimestamp;
				const waitedDate = new Date(nowDate + (cooldown.get(`${command.name}-${message.author.id}`) - Date.now())).getTime();
				if (cooldown.has(`${command.name}-${message.author.id}`)) {
					return message.reply({content: `Cooldown is currently active, please try again <t:${Math.floor(waitedDate / 1000)}:R>.`}).then(msg => setTimeout(() => msg.delete(), cooldown.get(`${command.name}-${message.author.id}`) - Date.now()));
				}

				command.prefixRun(client, message, args);
				cooldown.set(`${command.name}-${message.author.id}`, Date.now() + command.cooldown);
				setTimeout(() => {
					cooldown.delete(`${command.name}-${message.author.id}`);
				}, command.cooldown);
			} else {
				command.prefixRun(client, message, args);
			}
		}
	},
};
