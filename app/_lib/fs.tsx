import { $ } from 'execa';
import { join } from 'path';
import { recoverFileName } from '../_lib/file-naming';

import fs from 'fs';
import { createLogger } from './logger';

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
  try {
    await $(`rm -rf ${path}`);
  } catch (error) {
    createLogger().error('An error occurred:', error);
  }
}

export { deleteFolderRecursive, ensureDirAsync, writeFileAsync };
