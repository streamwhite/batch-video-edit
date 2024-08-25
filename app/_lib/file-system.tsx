import { $ } from 'execa';
import path, { join } from 'path';
import { recoverFileName } from './file-naming';

import fs from 'fs';
import { createLogger } from './logger';

const logger = createLogger();

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
    logger.error('An error occurred:', error);
  }
}

async function removeFilesInsideRecursive(directory: string) {
  const files = await fs.promises.readdir(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      await deleteFolderRecursive(filePath);
    } else {
      await fs.promises.unlink(filePath);
    }
  }
}

export {
  deleteFolderRecursive,
  ensureDirAsync,
  removeFilesInsideRecursive,
  writeFileAsync,
};
