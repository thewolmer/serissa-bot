import type { CommandKit } from 'commandkit';
import type { ButtonInteraction, Client, Message, ModalSubmitInteraction } from 'discord.js';

export interface CommandProps {
	message: Message<true>;
	client: Client<true>;
	handler: CommandKit;
	params: string[];
}

export type { SlashCommandProps, CommandOptions } from 'commandkit';

export interface ButtonInteractionProps {
	interaction: ButtonInteraction;
	client: Client;
	handler: CommandKit;
	params: string[];
}

export interface ModalInteractionProps {
	interaction: ModalSubmitInteraction;
	client: Client;
	handler: CommandKit;
	params: string[];
}
