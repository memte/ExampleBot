import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

 export const commandBase = {
  prefixData: {
  name: "ping",
  aliases: ["pong"]
  },
  slashData: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pong!"),
  // komutu geliştirmek istersen guide: https://discordjs.guide/slash-commands/advanced-creation.html
  cooldown: 5000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
  ownerOnly: false,//komutu sadece geliştiricinin kullanabilmesini istersen true olarak değiştir
  prefixRun: async (client, message, args) => {
    message.reply(`Pong 🏓`)
  },
  slashRun: async (client, interaction) => {
    interaction.reply(`Pong 🏓`)
  }
}