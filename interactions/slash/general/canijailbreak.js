const jailbreak = require('../../../resources/jailbreak.json');
const { SlashCommandBuilder } = require('discord.js');

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

		if (device[0].soc === 'A12' || device[0].soc === 'A13' || device[0].soc === 'A14' || device[0].soc === 'A15' || device[0].soc === 'M1') if (version === '15.0' || version === '15.0.1' || version === '15.0.2' || version === '15.1' || version === '15.1.1') result = true;

		await interaction.reply({
			content: `${device[0].name} on ${version} is ${result ? 'jailbreakable' : 'unjailbreakable'} using XinaA15!`,
			ephemeral: true
		});
	}
};
