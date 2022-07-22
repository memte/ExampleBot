import { ActivityType } from "discord.js";
export default {
	name: 'ready',
	once: true,
	execute(client) {
    let activities = [ `Developed by memte#7601`, `${client.user.username}` ], i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: ActivityType.Listenin }), 22000);
}};
