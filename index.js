import { Client, GatewayIntentBits, Partials } from "discord.js";
const client = new Client({
  intents: Object.values(GatewayIntentBits), 
  partials: Object.values(Partials),
  shards: "auto"
});
import config from "./src/config.js";
import { readdirSync } from "node:fs";

let token = config.token;

readdirSync("./src/utils").forEach(async (file) => {
  const util = await import(`./src/utils/${file}`);
  const utilFile = util.default;
  utilFile.execute(client);
});

client.login(token)
