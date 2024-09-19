const {Collection} = require('discord.js');
const cooldown = new Collection();

module.exports = {
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
					const waitedDate = new Date(nowDate + (cooldown.get(`${command.name}${interaction.user.id}`) - Date.now())).getTime();
					if (cooldown.has(`${command.name}${interaction.user.id}`)) {
						return interaction.reply({content: `Cooldown şuan aktif lütfen <t:${Math.floor(waitedDate / 1000)}:R> tekrar deneyin.`, ephemeral: true}).then(msg => setTimeout(() => interaction.deleteReply(), cooldown.get(`${command.name}${interaction.user.id}`) - Date.now()));
					}

					command.prefixRun(client, interaction);
					cooldown.set(`${command.name}${interaction.user.id}`, Date.now() + command.cooldown);
					setTimeout(() => {
						cooldown.delete(`${command.name}${interaction.user.id}`);
					}, command.cooldown);
				} else {
					command.slashRun(client, interaction);
				}
			}
		} catch (e) {
			console.error(e);
			interaction.reply({content: 'Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.', ephemeral: true});
		}
	},
};
