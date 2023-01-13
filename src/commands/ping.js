import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
    // komutu geliştirmek istersen guide: https://discordjs.guide/slash-commands/advanced-creation.html    run: async (client, interaction) => {
      interaction.reply(`Pong 🏓`)
    }
 };
