const { Client, Collection, Events, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember],
  shards: "auto"
});
const config = require("./src/config.js");
const { readdirSync } = require("node:fs");
const moment = require("moment");

let token = config.token;

client.commandAliases = new Collection();
client.commands = new Collection();
client.slashCommands = new Collection();
client.slashDatas = [];


function log(message) {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${message}`);
};
client.log = log

// Command Handler
readdirSync("./src/commands/prefix").forEach(async (folder) => {
readdirSync(`./src/commands/prefix/${folder}`).forEach(async (file) => {
  const command = await require(`./src/commands/prefix/${folder}/${file}`);
  if (command) {
    client.commands.set(command.name, command);
    if (command.aliases && Array.isArray(command.aliases)) {
      command.aliases.forEach((alias) => {
        client.commandAliases.set(alias, command.name);
      });
    }
  }
})
});

// Slash Command Handler
const slashcommands = [];
readdirSync("./src/commands/slash").forEach(async (folder) => {
readdirSync(`./src/commands/slash/${folder}`).forEach(async (file) => {
  const command = await require(`./src/commands/slash/${folder}/${file}`);
  client.slashDatas.push(command.data.toJSON());
  client.slashCommands.set(command.data.name, command);
})
});

// Event Handler
readdirSync("./src/events").forEach(async (file) => {
  const event = await require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});

// Process Listeners
process.on("unhandledRejection", (e) => {
  console.log(e);
});
process.on("uncaughtException", (e) => {
  console.log(e);
});
process.on("uncaughtExceptionMonitor", (e) => {
  console.log(e);
});

client.login(token);
