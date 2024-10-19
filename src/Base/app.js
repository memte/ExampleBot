import { Client, GatewayIntentBits, Partials } from "discord.js";
const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: Object.values(Partials),
  shards: "auto",
});
import { readdirSync } from "node:fs";
import config from "../base/config.js";

const token = config.token;

readdirSync("./src/Handlers").forEach(async (file) => {
  const handlerFile = await import(`../Handlers/${file}`);
  const handler = handlerFile.default;
  handler.execute(client);
});

client.login(token);
