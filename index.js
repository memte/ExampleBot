import { Client, Events, Partials, GatewayIntentBits, Collection } from "discord.js";
const client = new Client({
  intents: [GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember],
  shards: "auto"
});
import config from "./src/config.js";
import { readdirSync } from "node:fs";
import moment from "moment";

let token = config.token;

client.commands = new Collection()
client.commandAliases = new Collection()
client.slashCommands = new Collection()
client.slashDatas = []

function log(message) {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${message}`);
};
client.log = log

// Command Handler
// - Handlers -
const commandFolders = readdirSync("./src/commands");

Promise.all(commandFolders.map(async (category) => {
  const commandFiles = await readdirSync(`./src/commands/${category}`);

  await Promise.all(commandFiles.map(async (file) => {
    const commands = await import(`./src/commands/${category}/${file}`);

    if (commands) {
      if (commands.prefix) {
        // Prefix Command
        const prefixCommand = commands.prefix;
        client.commands.set(prefixCommand.name, prefixCommand);

        if (prefixCommand.aliases && Array.isArray(prefixCommand.aliases)) {
          prefixCommand.aliases.forEach(alias => {
            client.commandAliases.set(alias, prefixCommand.name);
          });
        }
      }

      if (commands.slash) {
        // Slash Command
        const slashCommand = commands.slash;
        client.slashDatas.push(slashCommand.data.toJSON());
        client.slashCommands.set(slashCommand.data.name, slashCommand);
      }
    }
  }));
}));

// Event Handler
const eventFiles = readdirSync("./src/events");

Promise.all(eventFiles.map(async (file) => {
const event = await import(`./src/events/${file}`).then(x => x.default);

if (event.once) {
  client.once(event.name, (...args) => event.execute(...args));
} else {
  client.on(event.name, (...args) => event.execute(...args));
}
}));

// Process Listeners
process.on("unhandledRejection", e => { 
   console.log(e)
 }) 
process.on("uncaughtException", e => { 
   console.log(e)
 })  
process.on("uncaughtExceptionMonitor", e => { 
   console.log(e)
 })
//

client.login(token)
