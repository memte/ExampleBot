const { ActivityType, Events } = require("discord.js")

module.exports = {
 name: Events.ClientReady,
 once: true,
 execute(client) {
  let activities = [ `Developed by memte.`, `${client.user.username}` ], i = 0;
  function botPresence() {
  client.user.presence.set({ activities: [{ name: `${activities[i++ % activities.length]}`, type: ActivityType.Listening }]})
  setInterval(botPresence, 120000)
  }
  botPresence()
  client.log(`${client.user.username} Aktif Edildi!`);
}};
