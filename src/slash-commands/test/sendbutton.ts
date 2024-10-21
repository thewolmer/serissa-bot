import type { CommandOptions, SlashCommandProps } from 'commandkit';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder().setName('sendbutton').setDescription('Sends an embed with a button');

export async function run({ interaction }: SlashCommandProps) {
	const embed = new EmbedBuilder()
		.setTitle('Test Button')
		.setDescription('Click the button below!')
		.setColor('Default');

	const button = new ButtonBuilder().setCustomId('text-lol-123').setLabel('Click me!').setStyle(ButtonStyle.Primary);

	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

	await interaction.reply({
		embeds: [embed],
		components: [row],
	});
}

export const options: CommandOptions = {
	deleted: false,
};
