const { Client, GatewayIntentBits, Events, Partials } = require("discord.js");
const client = new Client({ intents: Object.values(GatewayIntentBits).filter(x => typeof x === "string"), partials: Object.values(Partials).filter(x => typeof x === "string")});const config = require("./src/config.js");
const config = require("./src/config.js");
const { readdirSync } = require("node:fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(config.token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };

//command-handler
const commands = [];
readdirSync('./src/commands').forEach(file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

client.once("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) console.error(error);
    log(`${client.user.username} Aktif Edildi!`);
})

//event-handler
readdirSync('./src/events').forEach(async file => {
	const event = require(`./src/events/${file}`);
	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else client.on(event.name, (...args) => event.execute(...args));
})

//nodejs-events
process.on("unhandledRejection", e => console.log(e))
process.on("uncaughtException", e => console.log(e))
process.on("uncaughtExceptionMonitor", e => console.log(e))
//

client.login(config.token)
