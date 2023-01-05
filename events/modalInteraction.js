const { InteractionType } = require('discord-api-types/v10');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.type !== InteractionType.ModalSubmit) return;
		const command = interaction.client.modalCommands.get(interaction.customId);

		if (!command)
			await interaction.reply({
				content: 'There was an issue while fetching this modal!',
				ephemeral: true
			});

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
