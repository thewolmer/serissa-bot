import fs from 'node:fs';
import path from 'node:path';
import { Logger } from '@/utils/Logger';
import { getFilePaths } from '@/utils/getFilePaths';
import type { Client, Interaction } from 'discord.js';

export default async function (interaction: Interaction, client: Client, handler: unknown) {
	if (!interaction.isButton()) return;

	const [buttonName, ...params] = interaction.customId.split('-');
	const buttonsPath = path.join(__dirname, '..', '..', 'buttons');

	Logger('info', 'HANDLER', `Button interaction received for '${interaction.customId}'`);

	if (!fs.existsSync(buttonsPath)) {
		Logger('error', 'HANDLER', `Buttons directory not found: '${buttonsPath}'`);
		return true;
	}

	const buttonFiles = getFilePaths(buttonsPath);

	const buttonFile = buttonFiles.find((file) => {
		const fileName = path.basename(file, '.js');
		return fileName.toLowerCase() === buttonName.toLowerCase();
	});

	if (!buttonFile) {
		Logger('error', 'HANDLER', `No button handler found for '${buttonName}'`);
		return true;
	}

	try {
		const buttonModule = await import(buttonFile);
		if (typeof buttonModule.run !== 'function') {
			Logger('error', 'HANDLER', `Button handler ${buttonName} does not export a run function`);
			return true;
		}

		await buttonModule.run({ interaction, client, handler, params });
		return true;
	} catch (error) {
		Logger('error', 'HANDLER', `Error executing button handler for '${buttonName}'`);
		return true;
	}
}
