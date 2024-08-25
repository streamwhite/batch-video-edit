'use server';

import path from 'path';
import { clip } from '../_lib/clip';
import { batchCompress } from '../_lib/compress';
import { concatCTA as mergeCTA } from '../_lib/concat-cta';
import { batchConvert } from '../_lib/convert';
import { recoverFileName } from '../_lib/file-naming';
import {
  deleteFolderRecursive,
  ensureDirAsync,
  removeFilesInsideRecursive,
  writeFileAsync,
} from '../_lib/file-system';
import { createLogger } from '../_lib/logger';
import { screenshotsWithInterval } from '../_lib/screenshotsWithInterval';
import { getVideosAndClips } from '../_lib/utils';
import { renameIphoneVideosWithMeta } from '../rename-with-meta';

const uploadPath = 'uploads';

const logger = createLogger();

export async function clipVideos(formData: FormData) {
  const { videos, clips } = getVideosAndClips(formData);
  await removeFilesInsideRecursive(uploadPath);
  await ensureDirAsync(uploadPath);

  for (const video of videos) {
    const file = video as File;
    try {
      await writeFileAsync(file, uploadPath);
    } catch (error) {
      logger.error('An error occurred:', error);
    }
  }
  try {
    await clip(clips, [], uploadPath);
    await deleteFolderRecursive(uploadPath);
    return { isCompleted: true };
  } catch (error) {
    logger.error('An error occurred:', error);
  }
}

export async function convertVideos(formData: FormData) {
  const { videos } = getVideosAndClips(formData);
  await removeFilesInsideRecursive(uploadPath);

  await ensureDirAsync(uploadPath);
  for (const video of videos) {
    const file = video as File;
    try {
      await writeFileAsync(file, uploadPath);
    } catch (error) {
      logger.error('An error occurred:', error);
    }
  }
  const outPutFolder = createOutputFolder();

  try {
    await batchConvert(uploadPath, outPutFolder);
    await deleteFolderRecursive(uploadPath);

    return { isCompleted: true };
  } catch (error) {
    logger.error('An error occurred:', error);
  }
}

export async function concatCTA(formData: FormData) {
  const { videos } = getVideosAndClips(formData);
  const cta = formData.get('cta') as File;
  await removeFilesInsideRecursive(uploadPath);
  await ensureDirAsync(uploadPath);
  for (const video of [...videos, cta]) {
    const file = video as File;
    try {
      await writeFileAsync(file, uploadPath);
    } catch (error) {
      logger.error('An error occurred:', error);
    }
  }
  const outPutFolder = createOutputFolder();

  try {
    await mergeCTA({
      videos: videos.map((video) => recoverFileName(video as File)),
      outPutPath: outPutFolder,
      CTA: path.join(uploadPath, recoverFileName(cta)),
      inputPath: uploadPath,
    });
    await deleteFolderRecursive(uploadPath);

    return { isCompleted: true };
  } catch (error) {
    logger.error('An error occurred:', error);
  }
}

export async function compressVideos(formData: FormData) {
  const { videos } = getVideosAndClips(formData);
  await removeFilesInsideRecursive(uploadPath);

  await ensureDirAsync(uploadPath);
  for (const video of videos) {
    const file = video as File;
    try {
      await writeFileAsync(file, uploadPath);
    } catch (error) {
      logger.error('An error occurred:', error);
    }
  }
  const outPutFolder = createOutputFolder();

  try {
    await batchCompress(uploadPath, outPutFolder);
    await deleteFolderRecursive(uploadPath);
  } catch (error) {
    logger.error('An error occurred:', error);
  }
  return { isCompleted: true };
}

export async function takeScreenShots(formData: FormData) {
  const { videos } = getVideosAndClips(formData);
  const interval = Number(formData.get('interval'));
  await removeFilesInsideRecursive(uploadPath);
  await ensureDirAsync(uploadPath);
  for (const video of videos) {
    const file = video as File;
    try {
      await writeFileAsync(file, uploadPath);
    } catch (error) {
      logger.error('An error occurred:', error);
    }
  }
  const outPutFolder = createOutputFolder();

  try {
    await screenshotsWithInterval(uploadPath, outPutFolder, interval);
  } catch (error) {
    logger.error('An error occurred:', error);
  }

  deleteFolderRecursive(uploadPath);
  return { isCompleted: true };
}

export async function renameVideosWithMeta(formData: FormData) {
  const { videos } = getVideosAndClips(formData);
  await removeFilesInsideRecursive(uploadPath);

  await ensureDirAsync(uploadPath);
  await saveVideos(videos);
  const outPutFolder = createOutputFolder();

  try {
    await renameIphoneVideosWithMeta(uploadPath, outPutFolder);
  } catch (error) {
    logger.error('An error occurred:', error);
  }

  deleteFolderRecursive(uploadPath);
  return { isCompleted: true };
}
function createOutputFolder() {
  const outPutFolder = 'output';
  ensureDirAsync(outPutFolder);
  return outPutFolder;
}

async function saveVideos(videos: FormDataEntryValue[]) {
  for (const video of videos) {
    const file = video as File;
    try {
      await writeFileAsync(file, uploadPath);
    } catch (error) {
      logger.error('An error occurred:', error);
    }
  }
}
