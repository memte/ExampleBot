import {Client, GatewayIntentBits, Partials} from 'discord.js';
const client = new Client({
	intents: Object.values(GatewayIntentBits),
	partials: Object.values(Partials),
	shards: 'auto',
});
import {readdirSync} from 'node:fs';
import dotenv from "dotenv";
dotenv.config();

const token = process.env.BOT_TOKEN;

readdirSync('./src/Handlers').forEach(async file => {
	const utilFile = await import(`../Handlers/${file}`);
	const util = utilFile.default;
	util.execute(client);
});

client.login(token);
