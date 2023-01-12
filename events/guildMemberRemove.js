module.exports = {
	name: 'guildMemberRemove',
	async execute(member) {
		let channel = await member.guild.channels.fetch('1063213985815597126');
		channel.setName(`Humans: ${member.guild.memberCount - member.guild.members.cache.filter(m => m.user.bot).size}`).catch(e => console.error(`[ERROR]: ${e}`));
	}
};
