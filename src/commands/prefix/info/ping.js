const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    ownerOnly: false,//komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
    run: async (client, message, args) => {
      message.reply(`Pong 🏓`)
    }
 };
