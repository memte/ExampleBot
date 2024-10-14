import dotenv from "dotenv";
dotenv.config();

export default {
  prefix: "!",
  owners: ["Owner ID"],
  token: process.env.BOT_TOKEN,
};
