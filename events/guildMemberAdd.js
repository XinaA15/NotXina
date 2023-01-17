const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		await member.guild.channels.fetch('1063213985815597126').then(channel => {
			channel.setName(`Humans: ${member.guild.memberCount - member.guild.members.cache.filter(m => m.user.bot).size}`).catch(e => console.error(`[ERROR]: ${e}`));
		});

		await member.guild.channels.fetch('1064284756403032115').then(channel => {
			channel.send(new EmbedBuilder().setTitle(`Welcome ${member.user.tag.toString()}`).setDescription(`Welcome to the server, please read the rules at <#1052664412655329340> and grab roles at <#1061588505928663070>!`).setThumbnail(member.user.displayAvatarURL()).setColor('Random').setTimestamp().setFooter(`ID: ${member.user.id}`)).catch(e => console.error(`[ERROR]: ${e}`));
		});
	}
};
