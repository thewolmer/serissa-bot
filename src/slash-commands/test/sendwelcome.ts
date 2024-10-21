import type { CommandOptions, SlashCommandProps } from '@/types/Props';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	SlashCommandBuilder,
	TextChannel,
} from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('sendwelcome')
	.setDescription('Sends a welcome embed with an apply button');

export async function run({ interaction }: SlashCommandProps) {
	const embed = new EmbedBuilder()
		.setTitle('Welcome!')
		.setDescription('Click the button below to apply for membership.')
		.setColor('DarkPurple');

	const button = new ButtonBuilder().setCustomId('apply').setLabel('Apply Now').setStyle(ButtonStyle.Secondary);

	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

	try {
		if (interaction.channel instanceof TextChannel) {
			await interaction.channel.send({
				embeds: [embed],
				components: [row],
			});
			await interaction.reply({
				content: 'sent',
				ephemeral: true,
			});
		} else {
			throw new Error('Not a Text Channel');
		}
	} catch (error) {
		await interaction.reply({
			content: 'Failed to send embed in this channel',
			ephemeral: true,
		});
	}
}

export const options: CommandOptions = {
	deleted: false,
	devOnly: false,
	userPermissions: ['Administrator'],
};
