import DiscordClient from "./src/Base/DiscordClient.js";
import config from "./src/Base/config.js";

const token = config.token;
const client = new DiscordClient(token);
client.start();
