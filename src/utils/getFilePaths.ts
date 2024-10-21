import fs from 'node:fs';
import path from 'node:path';

export function getFilePaths(dir: string): string[] {
	const files = fs.readdirSync(dir, { withFileTypes: true });
	let filePaths: string[] = [];

	for (const file of files) {
		const filePath = path.join(dir, file.name);
		if (file.isDirectory()) {
			filePaths = filePaths.concat(getFilePaths(filePath));
		} else {
			filePaths.push(filePath);
		}
	}

	return filePaths;
}
