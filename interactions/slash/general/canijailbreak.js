const jailbreak = require('../../../resources/jailbreak.json');
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('canijailbreak')
		.setDescription('Check if your device is jailbreakable using XinaA15')
		.addStringOption(option => option.setName('device').setDescription('Your Device Model').setRequired(true).setAutocomplete(true))
		.addStringOption(option => option.setName('version').setDescription('Your Device Version').setRequired(true).setAutocomplete(true)),
	async execute(interaction) {
		let device = jailbreak.device.filter(d => d.name === interaction.options.getString('device'));
		let version = interaction.options.getString('version').split(' ')[1];
		let result = false;
		let embed = new EmbedBuilder();

		if (device[0].soc === 'A12' || device[0].soc === 'A13' || device[0].soc === 'A14' || device[0].soc === 'A15' || device[0].soc === 'M1') if (version === '15.0' || version === '15.0.1' || version === '15.0.2' || version === '15.1' || version === '15.1.1') result = true;

		if (result) {
			embed.setTitle('Congratualtions, your device is compatible');
			embed.setDescription(`${device[0].name} on ${version} is compatible with XinaA15`);
			embed.addFields({ name: 'Current Version', value: '1.16.2', inline: true }, { name: 'Comptabile Chips', value: 'A12-A15, M1', inline: true }, { name: 'Compatible Versions', value: '15.0 - 15.1.1', inline: true });
			embed.setColor('Green');
		} else {
			embed.setTitle('Unfortunately, your device is incompatible');
			embed.setDescription('XinaA15 is only compatible with devices using A12-A15, M1 chips and iOS 15.0 - 15.1.1');
			embed.setColor('Red');
		}

		await interaction.reply({
			embeds: [embed],
			components: result ? [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle('Link').setLabel('Guide').setURL('https://ptb.discord.com/channels/1052662721851691149/1052670152086392902/1061386442372305057'))] : [],
			ephemeral: true
		});
	}
};
