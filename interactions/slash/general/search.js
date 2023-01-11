const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Search for Tweaks and Repos')
		.addStringOption(option => option.setName('package').setDescription('The package you want to search').setAutocomplete(true))
		.addStringOption(option => option.setName('repo').setDescription('The repo you want to search').setAutocomplete(true))
		.addBooleanOption(option => option.setName('public').setDescription('Display the output publicly')),
	async execute(interaction) {
		let embed = new EmbedBuilder().setColor('Random');
		let package = interaction.options.getString('package');
		let repo = interaction.options.getString('repo');

		if (package == null && repo == null) {
			return await interaction.reply({
				content: 'You ran the command without any options',
				ephemeral: !interaction.options.getBoolean('public')
			});
		}

		if (package) {
			let packageRequest = await require('node-fetch')(`https://api.canister.me/v2/jailbreak/package/search?q=${encodeURIComponent(package)}`)
				.then(res => res.json())
				.then(json => json.data.filter(pkg => pkg.name == package)[0]);

			var row = new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle('Link').setLabel('Depiction').setURL(packageRequest.depiction));
			if (packageRequest.price === 'Free') row.addComponents(new ButtonBuilder().setStyle('Link').setLabel('Download').setURL(`${packageRequest.repository.uri}/${packageRequest.filename}`));

			embed
				.setTitle(packageRequest.name)
				.setDescription(packageRequest.description)
				.setThumbnail(packageRequest.icon)
				.addFields({ name: 'Author', value: packageRequest.author.split('<')[0], inline: true }, { name: 'Version', value: packageRequest.version, inline: true }, { name: 'Price', value: packageRequest.price, inline: true }, { name: 'Repo', value: `[${packageRequest.repository.name}](${packageRequest.repository.uri})`, inline: true }, { name: 'Bundle ID', value: packageRequest.package, inline: true })
				.setColor(packageRequest.tintColor ?? 'Random');
		}
		if (repo) {
			let repoRequest = await require('node-fetch')(`https://api.canister.me/v2/jailbreak/repository/search?q=${encodeURIComponent(repo.split(' ')[0])}`)
				.then(res => res.json())
				.then(json => json.data[0]);

			embed.setTitle(repoRequest.name).setDescription(repoRequest.description).setThumbnail(`${repoRequest.uri}/CydiaIcon.png`).addFields({ name: 'URL', value: repoRequest.uri, inline: true }, { name: 'Package Count', value: repoRequest.packageCount.toString(), inline: true });
		}

		await interaction.reply({
			embeds: [embed],
			components: row ? [row] : [],
			ephemeral: !interaction.options.getBoolean('public')
		});
	}
};
