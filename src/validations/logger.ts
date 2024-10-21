import { Logger } from '@/utils/Logger';
import type { ValidationProps } from 'commandkit';

export default function ({ interaction }: ValidationProps) {
	Logger('info', 'cmd-Validator', `Command Interaction created for '${interaction.commandName}'`);
}
