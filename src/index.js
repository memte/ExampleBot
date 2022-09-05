import { Client, Partials, GatewayIntentBits, Collection } from "discord.js";
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
import config from "./config.js";
import { readdirSync } from "fs";
import moment from "moment";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const token = config.token;

client.commands = new Collection()


const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };

//command-handler
const commands = []
  readdirSync(`./commands`).forEach(async file => {
    const command = await import(`./commands/${file}`).then(c => c.default)
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command)
  })

const rest = new REST({ version: '10' }).setToken(token);

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );

		    log(`${client.commands.size} Komut yüklendi ve yenilendi!`);
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} Başarıyla Aktif Edildi!`);
})

//event-handler
readdirSync('./events').forEach(async file => {
	const event = await import(`./events/${file}`).then(x => x.default)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})
//

client.login(token)
