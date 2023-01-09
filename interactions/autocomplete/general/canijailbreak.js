const jailbreak = require('../../../resources/jailbreak.json');

module.exports = {
	name: 'canijailbreak',
	async execute(interaction) {
		if (interaction.isAutocomplete()) {
			let choices;
			let focusedOption = interaction.options.getFocused(true);

			if (focusedOption.name == 'device') {
				try {
					choices = jailbreak.device.filter(device => device.type.includes('iPhone') || device.type.includes('iPad')).map(device => device.name);
					let filtered = choices.filter(c => c.toLowerCase().includes(focusedOption.value.toLowerCase())).slice(0, 25);
					return interaction.respond(filtered.map(c => ({ name: c, value: c })));
				} catch (err) {
					null;
				}
			} else {
				try {
					choices = jailbreak.ios.filter(ios => ios.osStr === 'iOS' || ios.osStr === 'iPadOS').map(os => `${os.osStr} ${os.version}`);
					let filtered = choices.filter(c => c.toLowerCase().includes(focusedOption.value.toLowerCase())).slice(0, 25);
					return interaction.respond(filtered.map(c => ({ name: c, value: c })));
				} catch (err) {
					null;
				}
			}
		}
	}
};
