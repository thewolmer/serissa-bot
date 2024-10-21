// import { Logger } from '@/utils/Logger';
import type { Client } from 'discord.js';

export default function (c: Client<true>) {
	// Logger('info', 'ready', `${c.user.username} restarted.`);
	console.log('ready', c.user.displayName);
}
