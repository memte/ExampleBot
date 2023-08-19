import { ActivityType, Events } from "discord.js";
export default {
	name: Events.ClientReady,
	once: true,
	execute(client) {
    let activities = [ `Developed by memte.`, `${client.user.username}` ], i = 0;
    setInterval(() => client.user.presence.set({ activities: [{ name: `${activities[i++ % activities.length]}`, type: ActivityType.Listening }]}), 22000);
}};
