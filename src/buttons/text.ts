import type { CommandKit } from 'commandkit';
import type { ButtonInteraction, Client } from 'discord.js';

export async function run(interaction: ButtonInteraction, _client: Client, _handler: CommandKit, params: string[]) {
	const user = interaction.user;
	const param1 = params[0] || 'N/A';
	const param2 = params[1] || 'N/A';

	await interaction.reply({
		content: `Button clicked by: ${user.tag}\nParam 1: ${param1}\nParam 2: ${param2}`,
		ephemeral: true,
	});
}
