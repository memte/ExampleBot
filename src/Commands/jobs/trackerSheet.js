import { logger } from '../../Handlers/logger.js';
import config from "../../Base/config.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const BASE_SHEET_URL = "https://docs.google.com/spreadsheets/d/";

export const commandBase = {
    prefixData: {
        name: "tracker-sheet-link",
        aliases: ["tracker-sheet"],
    },
    slashData: new SlashCommandBuilder().setName("tracker-sheet-link").setDescription("get link to the google sheet."),
    async prefixRun(client, message, args) {
        logger.info(`tracker-sheet-link command used by ${message.author.tag} in guild ${message.guild.name} (${message.guild.id})`);
        message.reply("Google Sheet Link: " + BASE_SHEET_URL + config.sheetId);
    },
    async slashRun(client, interaction) {
        interaction.reply("NOT YET IMPLEMENTED...");
    },
};
