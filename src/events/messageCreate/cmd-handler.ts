import fs from 'node:fs';
import path from 'node:path';
import { Logger } from '@/utils/Logger';
import { getFilePaths } from '@/utils/getFilePaths';
import type { CommandKit } from 'commandkit';
import type { Client, Message } from 'discord.js';

export default async function (message: Message<true>, client: Client<true>, handler: CommandKit) {
	if (!message.content.startsWith('w ')) return;

	const [_prefix, cmdName, ...params] = message.content.split(' ');
	const commandsPath = path.join(__dirname, '..', '..', 'commands');
	if (!fs.existsSync(commandsPath)) {
		Logger('error', 'HANDLER', `Commands directory not found: '${commandsPath}'`);
		return true;
	}
	const commandFiles = getFilePaths(commandsPath);
	const commandFile = commandFiles.find((file) => {
		const fileName = path.basename(file, '.js');
		return fileName.toLowerCase() === cmdName.toLowerCase();
	});

	if (!commandFile) {
		return true;
	}

	try {
		const cmdModule = await import(commandFile);
		if (typeof cmdModule.run !== 'function') {
			Logger('error', 'HANDLER', `Cmd handler ${cmdName} does not export a run function`);
			return true;
		}
		await cmdModule.run({ message, client, handler, params });
		return true;
	} catch (error) {
		Logger('error', 'HANDLER', `Error executing command handler for '${cmdName}'`);
		return true;
	}
}
