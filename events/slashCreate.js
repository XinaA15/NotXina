module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.slashCommands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (err) {
			await interaction.reply({
				content: `There was an issue while executing that command!\n\`\`\`${err}\`\`\``,
				ephemeral: true
			});
		}
	}
};
