import type { ModalInteractionProps } from '@/types/Props';
import { Logger } from '@/utils/Logger';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, type TextChannel } from 'discord.js';

export async function run({ interaction, client }: ModalInteractionProps) {
	const user = interaction.user;
	const { fields } = interaction;

	const name = fields.getTextInputValue('name');
	const dob = fields.getTextInputValue('dob');
	const inviter = fields.getTextInputValue('inviter');
	const interests = fields.getTextInputValue('inviter');
	const about = fields.getTextInputValue('about');
	await interaction.deferReply({ ephemeral: true });

	// check whether the inviter id is a discord user or not
	try {
		await client.users.fetch(inviter.trim());
	} catch (error) {
		return await interaction.followUp({
			content: `Sorry, <@${user.id}> Inviter with id '${inviter}' is not a valid discord user. \n If that was a mistake, Please re-apply with the correct id.`,
			ephemeral: true,
		});
	}

	const embed = new EmbedBuilder()
		.setTitle('New application!')
		.setDescription(
			`name: ${name}\n dob: ${dob} \n interests: ${interests} \nabout: ${about}\n invited by: <@${inviter.trim()}>`,
		)
		.setColor('DarkPurple')
		.setThumbnail(user.avatarURL());

	const button1 = new ButtonBuilder()
		.setCustomId(`application-approve-${user.id}-1261619383692693545`)
		.setLabel('Approve')
		.setStyle(ButtonStyle.Success);

	const button2 = new ButtonBuilder()
		.setCustomId(`application-reject-${user.id}-1261619383692693545`)
		.setLabel('Reject')
		.setStyle(ButtonStyle.Danger);

	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button1, button2);

	try {
		const channel = client.channels.cache.get('1103449757206196285');
		if (channel && 'send' in channel) {
			(channel as TextChannel).send({ embeds: [embed], components: [row] });
		}
	} catch (error) {
		Logger('error', 'BTN-Apply', `Failed to send embed ${error}`);
	} finally {
		// biome-ignore lint/correctness/noUnsafeFinally: <explanation>
		return await interaction.followUp({ content: `<@${user.id}> Thank you for your application!`, ephemeral: true });
	}
}
