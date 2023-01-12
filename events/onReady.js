const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`[CLIENT] Logged in as ${client.user.tag}!`);

		client.user.setPresence({ status: 'dnd', activities: [{ name: 'xina make xinaA15', type: ActivityType.Watching }] });

		client.guilds.fetch(process.env.GUILD).then(guild => {
			guild.channels
				.fetch('1063213985815597126')
				.then(channel => {
					channel.setName(`Humans: ${guild.memberCount - guild.members.cache.filter(m => m.user.bot).size}`).catch(e => console.error(`[ERROR]: ${e}`));
				})
				.catch(e => console.error(`[ERROR]: ${e}`));
		});
	}
};
