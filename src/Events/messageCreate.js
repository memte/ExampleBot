import { ChannelType, Collection, Events } from "discord.js";
import config from "../base/config.js";
const cooldown = new Collection();

export default {
  name: Events.MessageCreate,
  async execute(message) {
    const { client } = message;

    if (message.author.bot) {
      return;
    }

    if (message.channel.type === ChannelType.DM) {
      return;
    }

    const { prefix } = config;
    if (!message.content.startsWith(prefix)) {
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) {
      return;
    }

    let command = client.commands.get(cmd);
    command ||= client.commands.get(client.commandAliases.get(cmd));

    if (command) {
      if (command.ownerOnly && !config.owners.includes(message.author.id)) {
        return message.reply({
          content: "Only my **developers** can use this command.",
        });
      }

      if (command.cooldown) {
        if (cooldown.has(`${command.name}-${message.author.id}`)) {
          const nowDate = message.createdTimestamp;
          const waitedDate =
            cooldown.get(`${command.name}-${message.author.id}`) - nowDate;
          return message
            .reply({
              content: `Cooldown is currently active, please try again <t:${Math.floor(new Date(nowDate + waitedDate).getTime() / 1000)}:R>.`,
            })
            .then((msg) =>
              setTimeout(
                () => msg.delete(),
                cooldown.get(`${command.name}-${message.author.id}`) -
                  Date.now() +
                  1000,
              ),
            );
        }

        command.prefixRun(client, message, args);

        cooldown.set(
          `${command.name}-${message.author.id}`,
          Date.now() + command.cooldown,
        );

        setTimeout(() => {
          cooldown.delete(`${command.name}-${message.author.id}`);
        }, command.cooldown);
      } else {
        command.prefixRun(client, message, args);
      }
    }
  },
};
