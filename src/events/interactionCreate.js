import {Collection} from 'discord.js';
const cooldown = new Collection();

export default {
	name: 'interactionCreate',
	async execute(interaction) {
		const {client} = interaction;
		if (!interaction.isCommand()) {
			return;
		}

		if (interaction.user.bot) {
			return;
		}

		try {
			const command = client.slashCommands.get(interaction.commandName);
			if (command) {
				if (command.cooldown) {
					const nowDate = interaction.createdTimestamp;
					const waitedDate = new Date(nowDate + (cooldown.get(`${command.name}-${interaction.user.id}`) - Date.now())).getTime();
					if (cooldown.has(`${command.name}-${interaction.user.id}`)) {
						return interaction.reply({content: `Cooldown is currently active, please try again <t:${Math.floor(waitedDate / 1000)}:R>.`, ephemeral: true}).then(() => setTimeout(() => interaction.deleteReply(), cooldown.get(`${command.name}-${interaction.user.id}`) - Date.now()));
					}

					command.prefixRun(client, interaction);
					cooldown.set(`${command.name}-${interaction.user.id}`, Date.now() + command.cooldown);
					setTimeout(() => {
						cooldown.delete(`${command.name}-${interaction.user.id}`);
					}, command.cooldown);
				} else {
					command.slashRun(client, interaction);
				}
			}
		} catch (e) {
			console.error(e);
			interaction.reply({content: 'An error occurred while executing the command! Please try again.', ephemeral: true});
		}
	},
};
