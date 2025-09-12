import "@dotenvx/dotenvx/config";

export default {
  prefix: "!",
  owners: ["Owner ID"],
  token: process.env.BOT_TOKEN,
  sheetId: process.env.SHEET_ID,
  sheetHeaderRange: process.env.SHEET_HEADER_RANGE,
  sheetRangeTemplate: process.env.SHEET_RANGE_TEMPLATE,
  googleAuthCredentials: process.env.GOOGLE_CREDENTIALS_JSON === undefined || process.env.GOOGLE_CREDENTIALS_JSON === "" ? undefined : JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON),
  googleAuthToken: process.env.GOOGLE_TOKEN_JSON === undefined || process.env.GOOGLE_TOKEN_JSON === "" ? undefined : JSON.parse(process.env.GOOGLE_TOKEN_JSON),
};
