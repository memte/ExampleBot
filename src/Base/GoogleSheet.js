import { google } from 'googleapis';
import config from './config.js';
import { logger } from '../Handlers/logger.js';

const SPREADSHEET_ID = config.sheetId;
const TABLE_HEADER_RANG = config.sheetHeaderRange;
const TABLE_RANGE_TEMPLATE = config.sheetRangeTemplate;
const MAX_ROW_PULL = 10;

export default class GoogleSheet {
    constructor(auth) {
        this.auth = auth;
        this.sheet = google.sheets({ version: 'v4', auth: this.auth });
    }

    async getTableHeader() {
        const result = await this.sheet.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: TABLE_HEADER_RANG,
        });

        if (result.data.values === undefined || result.data.values.length === 0) {
            return [];
        }

        return result.data.values[0];
    }

    async getLastRowIndex() {
        let startRow = 1;
        /**
         * Pull the 10 rows at a time until a batch has a empty row hit first
         */
        while (true) {
            let ranges = [];
            for (let i = 0; i < MAX_ROW_PULL; i++) {
                ranges.push(TABLE_RANGE_TEMPLATE.replace('#', startRow + i).replace('#', startRow + i));
            }

            logger.info(`Checking rows ${startRow} to ${startRow + MAX_ROW_PULL - 1} for empty row.`);

            const result = await this.sheet.spreadsheets.values.batchGet({
                spreadsheetId: SPREADSHEET_ID,
                ranges: ranges,
            });

            for (var row of result.data.valueRanges) {
                logger.info(`Row ${row.range} values:`, row.values);
                if (row.values === undefined || row.values === null) {
                    return row.range;
                }
            }

            startRow += MAX_ROW_PULL;

            // Sleep for 3 seconds to avoid rate limit
            await new Promise(r => setTimeout(r, 3000));
        }
    }

    async updateRow(range, values) {
        try {
            await this.sheet.spreadsheets.values.update({
                spreadsheetId: SPREADSHEET_ID,
                range: range,
                valueInputOption: 'RAW',
                resource: { values },
            });
            return true;
        } catch (err) {
            logger.error('Error updating row:', err);
            return false;
        }
    }
}