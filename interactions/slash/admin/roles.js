const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Setup reaction roles for the server')
		.addChannelOption(option => option.setName('channel').setDescription('The channel to send the message in'))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		let channel = interaction.options.getChannel('channel') ?? interaction.channel;
		const [prompts, iphones, ipads, ioses, langauages, updates] = [
			['Select your iPhone model', 'Select your iPad model', 'Select your iOS version', 'Select your language', 'Select your pings'],
			[
				{ label: 'iPhone SE (Gen 2)', value: '1059949046996947095' },
				{ label: 'iPhone SE (Gen 3)', value: '1059953736698581002' },
				{ label: 'iPhone XR', value: '1059947730765611132' },
				{ label: 'iPhone XS', value: '1059947751980421191' },
				{ label: 'iPhone 11', value: '1059949023701770250' },
				{ label: 'iPhone 12', value: '1059949038461538315' },
				{ label: 'iPhone 13', value: '1059949040319594539' },
				{ label: 'iPhone 14', value: '1059949043100418171' },
				{ label: 'Mini', value: '1059948625737830510' },
				{ label: 'Plus', value: '1059949045075943464' },
				{ label: 'Pro', value: '1059948568682696714' },
				{ label: 'Max', value: '1059948501242495037' }
			],
			[
				{ label: 'iPad', value: '1059949288064557106' },
				{ label: 'Air', value: '1059950412616183848' },
				{ label: 'Pro', value: '1059948568682696714' },
				{ label: 'Mini', value: '1059948625737830510' },
				{ label: '1st Gen', value: '1059950634599710751' },
				{ label: '2nd Gen', value: '1059950798601195561' },
				{ label: '3rd Gen', value: '1059950811930697819' },
				{ label: '4th Gen', value: '1059950815143542845' },
				{ label: '5th Gen', value: '1059950825574764615' },
				{ label: '6th Gen', value: '1059950830024925335' },
				{ label: '7th Gen', value: '1059950837490786344' },
				{ label: '8th Gen', value: '1059950840850419824' },
				{ label: '9th Gen', value: '1059950848953827449' },
				{ label: '10th Gen', value: '1059950858109984799' }
			],
			[
				{ label: '15.0', value: '1059509419500654683' },
				{ label: '15.0.1', value: '1059950884114669799' },
				{ label: '15.0.2', value: '1059950889240100966' },
				{ label: '15.1', value: '1059950892167745536' },
				{ label: '15.1.1', value: '1059950894914998392' }
			],
			[
				{ label: 'English', value: '1052968921248059404' },
				{ label: 'Chinese', value: '1052968940738973777' }
			],
			[
				{ label: 'Stages', value: '1059508897947340991' },
				{ label: 'Server', value: '1059509063727190016' },
				{ label: 'Twitter', value: '1059509412118659193' },
				{ label: 'Jailbreak', value: '1059509419500654683' }
			]
		];

		channel.send({
			content: prompts[0],
			components: [
				new ActionRowBuilder().addComponents(
					new StringSelectMenuBuilder()
						.setCustomId('iphone')
						.setMinValues(0)
						.setMaxValues(iphones.length)
						.addOptions(
							iphones.map(iphone => {
								return {
									label: iphone.label,
									value: iphone.value
								};
							})
						)
				)
			]
		});

		channel.send({
			content: prompts[1],
			components: [
				new ActionRowBuilder().addComponents(
					new StringSelectMenuBuilder()
						.setCustomId('ipad')
						.setMinValues(0)
						.setMaxValues(ipads.length)
						.addOptions(
							ipads.map(ipad => {
								return {
									label: ipad.label,
									value: ipad.value
								};
							})
						)
				)
			]
		});

		channel.send({
			content: prompts[2],
			components: [
				new ActionRowBuilder().addComponents(
					new StringSelectMenuBuilder()
						.setCustomId('ios')
						.setMinValues(0)
						.setMaxValues(ioses.length)
						.addOptions(
							ioses.map(ios => {
								return {
									label: ios.label,
									value: ios.value
								};
							})
						)
				)
			]
		});

		channel.send({
			content: prompts[3],
			components: [
				new ActionRowBuilder().addComponents(
					new StringSelectMenuBuilder()
						.setCustomId('language')
						.setMinValues(0)
						.setMaxValues(langauages.length)
						.addOptions(
							langauages.map(langauage => {
								return {
									label: langauage.label,
									value: langauage.value
								};
							})
						)
				)
			]
		});

		channel.send({
			content: prompts[4],
			components: [
				new ActionRowBuilder().addComponents(
					new StringSelectMenuBuilder()
						.setCustomId('update')
						.setMinValues(0)
						.setMaxValues(updates.length)
						.addOptions(
							updates.map(update => {
								return {
									label: update.label,
									value: update.value
								};
							})
						)
				)
			]
		});

		await interaction.reply({
			content: 'Done setting up reaction roles!',
			ephemeral: true
		});
	}
};
