module.exports = {
	name: 'search',
	async execute(interaction) {
		if (interaction.isAutocomplete()) {
			let choices;
			let focusedOption = interaction.options.getFocused(true);

			if (focusedOption.value.length > 2) {
				if (focusedOption.name == 'package') {
					let request = await require('node-fetch')(`https://api.canister.me/v2/jailbreak/package/search?q=${encodeURIComponent(focusedOption.value)}`);
					let response = await request.json().then(json => json.data);

					try {
						choices = response.map(package => package.name).filter(name => name != null);
						let filtered = choices.filter(c => c.toLowerCase().includes(focusedOption.value.toLowerCase()));
						return interaction.respond(filtered.map(c => ({ name: c, value: c })));
					} catch (err) {
						null;
					}
				} else {
					let request = await require('node-fetch')(`https://api.canister.me/v2/jailbreak/repository/search?q=${encodeURIComponent(focusedOption.value)}`);
					let response = await request.json().then(json => json.data);

					try {
						choices = response.map(package => package.name).filter(name => name != null);
						let filtered = choices.filter(c => c.toLowerCase().includes(focusedOption.value.toLowerCase()));
						return interaction.respond(filtered.map(c => ({ name: c, value: c })));
					} catch (err) {
						null;
					}
				}
			}
		}
	}
};
