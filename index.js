const {Client, Intents} = require('discord.js');
const client = new Client({
	intents: Object.values(Intents.FLAGS),
	partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'GUILD_SCHEDULED_EVENT'],
	shards: 'auto',
});
const config = require('./src/config.js');
const {readdirSync} = require('node:fs');

const {token} = config;

readdirSync('./src/utils').map(async file => {
	const util = await require(`./src/utils/${file}`);
	util.execute(client);
});

client.login(token);
