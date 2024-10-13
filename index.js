import {Client, Intents} from 'discord.js';
const client = new Client({
	intents: Object.values(Intents.FLAGS),
	partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'GUILD_SCHEDULED_EVENT'],
	shards: 'auto',
});
import config from './src/config.js';
import {readdirSync} from 'node:fs';

const {token} = config;

readdirSync('./src/utils').map(async file => {
	const utilFile = await import(`./src/utils/${file}`);
	const util = utilFile.default;
	util.execute(client);
});

client.login(token);
