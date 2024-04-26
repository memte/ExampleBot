import {Client, GatewayIntentBits, Partials} from 'discord.js';
const client = new Client({
	intents: Object.values(GatewayIntentBits),
	partials: Object.values(Partials),
	shards: 'auto',
});
import config from './src/config.js';
import {readdirSync} from 'node:fs';

const {token} = config;

readdirSync('./src/utils').forEach(async file => {
	const utilFile = await import(`./src/utils/${file}`);
	const util = utilFile.default;
	utilFile.execute(client);
});

client.login(token);
