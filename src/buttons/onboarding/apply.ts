import type { ButtonInteractionProps } from '@/types/Props';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export async function run({ interaction }: ButtonInteractionProps) {
	const user = interaction.user;

	const modal = new ModalBuilder().setCustomId(`apply-${user.id}`).setTitle('Application Form');

	const nameInput = new TextInputBuilder()
		.setCustomId('name')
		.setLabel('Your name')
		.setPlaceholder(`Eg: ${user.displayName}`)
		.setMinLength(3)
		.setMaxLength(32)
		.setStyle(TextInputStyle.Short);

	const addedByInput = new TextInputBuilder()
		.setCustomId('inviter')
		.setLabel('Who invited you? [ Discord user Id ]')
		.setPlaceholder('Eg: 1251801535952719976')
		.setMinLength(15)
		.setMaxLength(24)
		.setStyle(TextInputStyle.Short);

	const dobInput = new TextInputBuilder()
		.setCustomId('dob')
		.setLabel('When were you born?')
		.setPlaceholder('01/01/2001')
		.setMinLength(5)
		.setMaxLength(10)
		.setStyle(TextInputStyle.Short);

	const interestsInput = new TextInputBuilder()
		.setCustomId('interests')
		.setLabel('What are your interests?')
		.setPlaceholder('Eg: Tech, Cinematography, AI, Cars, History, Politics, etc.')
		.setMinLength(32)
		.setMaxLength(100)
		.setStyle(TextInputStyle.Short);

	const aboutInput = new TextInputBuilder()
		.setCustomId('about')
		.setLabel('Tell us about yourself')
		.setPlaceholder('My into')
		.setStyle(TextInputStyle.Paragraph);

	const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput);
	const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(addedByInput);
	const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(dobInput);
	const row4 = new ActionRowBuilder<TextInputBuilder>().addComponents(interestsInput);
	const row5 = new ActionRowBuilder<TextInputBuilder>().addComponents(aboutInput);

	modal.addComponents(row1, row2, row3, row4, row5);

	return await interaction.showModal(modal);
}
