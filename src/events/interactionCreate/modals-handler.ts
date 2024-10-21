import fs from 'node:fs';
import path from 'node:path';
import { Logger } from '@/utils/Logger';
import { getFilePaths } from '@/utils/getFilePaths';
import type { Client, Interaction } from 'discord.js';

export default async function (interaction: Interaction, client: Client, handler: unknown) {
	if (!interaction.isModalSubmit()) return;

	const [modalName, ...params] = interaction.customId.split('-');
	const modalsPath = path.join(__dirname, '..', '..', 'modals');

	Logger('info', 'HANDLER', `Modal interaction received for '${interaction.customId}'`);

	if (!fs.existsSync(modalsPath)) {
		Logger('error', 'HANDLER', `Modals directory not found: '${modalsPath}'`);
		return true;
	}

	const modalFiles = getFilePaths(modalsPath);

	const modalFile = modalFiles.find((file) => {
		const fileName = path.basename(file, '.js');
		return fileName.toLowerCase() === modalName.toLowerCase();
	});

	if (!modalFile) {
		Logger('error', 'HANDLER', `No Modal handler found for '${modalName}'`);
		return true;
	}

	try {
		const modalModule = await import(modalFile);
		if (typeof modalModule.run !== 'function') {
			Logger('error', 'HANDLER', `Modal handler ${modalName} does not export a run function`);
			return true;
		}

		await modalModule.run({ interaction, client, handler, params });
		return true;
	} catch (error) {
		Logger('error', 'HANDLER', `Error executing modal handler for '${modalName}' : ${error}`);
		return true;
	}
}
