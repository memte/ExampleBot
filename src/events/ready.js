import { ActivityType, Events } from "discord.js";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

export default {
 name: Events.ClientReady,
 once: true,
 execute(client) {
  const rest = new REST({ version: "10" }).setToken(client.token);
  let activities = [ `Developed by memte.`, `${client.user.username}` ], i = 0;
  function botPresence() {
  client.user.presence.set({ activities: [{ name: `${activities[i++ % activities.length]}`, type: ActivityType.Listening }]})
  setInterval(botPresence, 120000)
  }
  botPresence()
  client.log(`${client.user.username} Aktif Edildi!`)
  //
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.slashDatas,
    });
  } catch (error) {
    console.error(error);
  }
 }};
