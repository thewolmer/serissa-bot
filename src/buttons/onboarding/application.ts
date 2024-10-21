import type { ButtonInteractionProps } from '@/types/Props';
import { Logger } from '@/utils/Logger';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export async function run({ interaction, params }: ButtonInteractionProps) {
	const [action, userId, roleId] = params;

	const member = interaction.guild?.members.cache.get(userId);
	const role = interaction.guild?.roles.cache.get(roleId);

	const button = new ButtonBuilder()
		.setCustomId(`application-${action}-${userId}-${roleId}`)
		.setLabel(action === 'approve' ? 'Approve' : 'Reject')
		.setStyle(action === 'approve' ? ButtonStyle.Success : ButtonStyle.Danger)
		.setDisabled(true);

	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

	if (!member) {
		Logger('error', 'Role Button', `Member with ID ${userId} not found.`);
		return;
	}

	if (!role) {
		Logger('error', 'Role Button', `Role with ID ${roleId} not found.`);
		return;
	}

	if (action === 'approve') {
		if (member.roles.cache.has(role.id)) {
			Logger('info', 'Role Button', `Member with ID ${userId} already has the role with ID ${roleId}.`);
			await interaction.update({
				content: 'Role added successfully!',
				components: [row],
			});
			return;
		}
		try {
			await member.roles.add(role);
			Logger('info', 'Role Button', `Role with ID ${roleId} added to member with ID ${userId}.`);

			await interaction.update({
				content: 'Role added successfully!',
				components: [row],
			});
		} catch (error) {
			Logger(
				'error',
				'Role Button',
				`Failed to add role with ID ${roleId} to member with ID ${userId}. Error: ${error}`,
			);
		}
	} else if (action === 'reject') {
		if (!member.roles.cache.has(role.id)) {
			Logger('info', 'Role Button', `Member with ID ${userId} does not have the role with ID ${roleId}.`);
			await interaction.update({
				content: 'Role removed successfully!',
				components: [row],
			});
			return;
		}

		try {
			await member.roles.remove(role);
			Logger('info', 'Role Button', `Role with ID ${roleId} removed from member with ID ${userId}.`);
			await interaction.update({
				content: 'Role removed successfully!',
				components: [row],
			});
		} catch (error) {
			Logger(
				'error',
				'Role Button',
				`Failed to remove role with ID ${roleId} from member with ID ${userId}. Error: ${error}`,
			);
		}
	}
}
