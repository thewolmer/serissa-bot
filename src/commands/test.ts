import type { CommandProps } from '@/types/Props';

export async function run({ message, client, params }: CommandProps) {
	try {
		console.log(params);
		const param1 = params[0] || 'N/A';
		if (typeof param1 !== 'string' || !/^\d+$/.test(param1)) {
			throw new Error(`Invalid user ID: ${param1}`);
		}
		const member = await client.users.fetch(param1);
		message.reply({ content: `id: ${member.id}\n  name: ${member.username}` });
	} catch (error) {
		console.log(error);
	}
}
