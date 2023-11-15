import { EmbedBuilder, PermissionsBitField } from "discord.js";

export default {
    name: "ping",
    aliases: ["pong"],
    cooldown: 5000,//s1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    ownerOnly: true,//komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
    run: async (client, message, args) => {
      message.reply(`Pong 🏓`)
    }
 };
