import googleAuthInstance from "../../Base/GoogleAuth.js";
import GoogleSheet from "../../Base/GoogleSheet.js";
import urlToMarkdown from "../../Base/urlToMarkdown.js";
import modelConvertToTableSchema from "../../Base/modelConvertToTableSchema.js";
import { logger } from '../../Handlers/logger.js';
import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

async function commandAction(url, discord) {
    const webpage = await urlToMarkdown(url);

    if (webpage === null || webpage === undefined || webpage === '') {
        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle("Invalid URL")
            .setDescription("The provided URL is invalid or inaccessible. Please check the URL and try again.")
            .setTimestamp();

        await discord.reply({ embeds: [embed] });
        return;
    }

    const jobDetails = await modelConvertToTableSchema.invoke(webpage);
    // Have to store them as a 2D array for google sheets api, rowData[0] = first row, rowData[1] = second row, etc.
    const rowData = [
        [
            jobDetails.company_name,
            jobDetails.position,
            jobDetails.pay_range,
            jobDetails.about,
            jobDetails.notes || "",
            jobDetails.website_application_link,
            new Date().toLocaleDateString()
        ],
    ];

    const googleSheetAuthClient = await googleAuthInstance.getAuth();
    const googleSheet = new GoogleSheet(googleSheetAuthClient);
    const lastRowRange = await googleSheet.getLastRowIndex();
    const result = await googleSheet.updateRow(lastRowRange, rowData);

    if (result) {
        const embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle("Job Application Tracked")
            .setDescription(`Successfully tracked the job application for **${jobDetails.position}** at **${jobDetails.company_name}**.`)
            .addFields(
                { name: 'Company', value: jobDetails.company_name, inline: true },
                { name: 'Position', value: jobDetails.position, inline: true },
                { name: 'Pay Range', value: jobDetails.pay_range || "N/A", inline: true },
                { name: 'Application Link', value: jobDetails.website_application_link || "N/A" }
            )
            .setTimestamp();
        await discord.reply({ embeds: [embed] });
        return;
    }

    const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("Job Application Tracking Failed")
        .setDescription(`Failed to track the job application for **${jobDetails.position}** at **${jobDetails.company_name}**. Please try again later.`)
        .setTimestamp();
    await discord.reply({ embeds: [embed] });
}

export const commandBase = {
    prefixData: {
        name: "tracker-application",
        aliases: ["tracker"],
    },
    slashData: new SlashCommandBuilder()
        .setName("tracker-application")
        .setDescription("Use to tracker a job and add it to the google sheet.")
        .addStringOption((option) =>
            option
                .setName("url")
                .setDescription("url to the job application")
                .setRequired(true)
        ),
    async prefixRun(client, message, args) {
        const url = args[0];
        logger.info(`tracker-application command used by ${message.author.tag} in guild ${message.guild.name} (${message.guild.id}) with URL: ${url}`);
        if (!url || url.length === 0) {
            message.reply("Please provide a valid URL.");
            return;
        }
        await commandAction(url, message);
    },
    async slashRun(client, interaction) {
        interaction.reply("NOT WORKING YET...");
    },
};
