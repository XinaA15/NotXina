const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`[CLIENT] Logged in as ${client.user.tag}!`);

		client.user.setPresence({ status: 'dnd', activities: [{ name: 'xina make xinaA15', type: ActivityType.Watching }] });
	}
};
