import { $ } from 'execa';
import { join } from 'path';
import { recoverFileName } from '../_lib/file-naming';

import fs from 'fs';

async function writeFileAsync(file: File, folder: string = 'uploads') {
  const filePath = join(folder, recoverFileName(file));
  const fileBuffer = await file.arrayBuffer();
  await fs.promises.writeFile(filePath, new Uint8Array(fileBuffer));
  return filePath;
}
function ensureDirAsync(folder: string) {
  return fs.promises.mkdir(folder, { recursive: true });
}

async function deleteFolderRecursive(path: string) {
  await $(`rm -rf ${path}`);
}

export { deleteFolderRecursive, ensureDirAsync, writeFileAsync };
