import { client } from '@/index';
import type { TextChannel } from 'discord.js';
import color from 'picocolors';

const enableLogs = true;

export const Logger = (type: 'warn' | 'error' | 'info', origin: string, message: string) => {
	if (!enableLogs) return;

	let logColor: (str: string) => string;
	switch (type.toLowerCase()) {
		case 'warn':
			logColor = color.yellow;
			break;
		case 'error':
			logColor = color.red;
			break;
		default:
			logColor = color.blueBright;
	}

	const consoleLogMessage = logColor(`[${color.bold(`${type.toUpperCase()}`)}: ${origin.toUpperCase()}] ${message}`);
	const logMessage = `[**${type.toUpperCase()}**: ${origin.toUpperCase()}] ${message}`;
	console.log(consoleLogMessage);
	const channel = client.channels.cache.get('1103449757206196285');
	if (channel && 'send' in channel) {
		(channel as TextChannel).send(logMessage);
	}
};
