import { Client, Intents } from "discord.js";
const client = new Client({
  intents: Object.values(Intents.FLAGS),
  partials: [
    "USER",
    "CHANNEL",
    "GUILD_MEMBER",
    "MESSAGE",
    "REACTION",
    "GUILD_SCHEDULED_EVENT",
  ],
  shards: "auto",
});
import { readdirSync } from "node:fs";
import config from "../base/config.js";

const token = config.token;

readdirSync("./src/Handlers").map(async (file) => {
  const handlerFile = await import(`../Handlers/${file}`);
  const handler = handlerFile.default;
  handler.execute(client);
});

client.login(token);
