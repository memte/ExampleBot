import { EmbedBuilder, PermissionsBitField } from "discord.js";

export default {
    name: "ping",
    aliases: ["pong"],
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    run: async (client, message, args) => {
      message.reply(`Pong 🏓`)
    }
 };
