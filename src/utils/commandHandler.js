const { Collection } = require("discord.js");
const { readdirSync } = require("node:fs");

module.exports = {
    execute: async (client) => {
        client.commandAliases = new Collection();
        client.commands = new Collection();
        client.slashCommands = new Collection();
        client.slashDatas = [];

        const commandFolders = readdirSync("./src/commands");

        Promise.all(commandFolders.map(async (category) => {
          const commandFiles = await readdirSync(`./src/commands/${category}`);
      
          await Promise.all(commandFiles.map(async (file) => {
            const commands = await require(`../commands/${category}/${file}`);
      
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
    }
}