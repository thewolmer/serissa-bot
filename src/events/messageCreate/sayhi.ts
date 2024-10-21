import type { Message } from 'discord.js';

export default function (message: Message<true>) {
	if (message.content === 'hey') {
		message.reply('Hi!');
	}
}
