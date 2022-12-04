import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
    // komuta seçenekler eklemek istersen guide: https://discordjs.guide/interactions/slash-commands.html#options
    run: async (client, interaction) => {
      interaction.reply(`Pong 🏓`)
    }
 };
