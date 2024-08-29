import { $ } from 'execa';
import fs from 'fs';
import path from 'path';
export async function batchCompress(inputPath: string, outputPath: string) {
  const videos = fs.readdirSync(inputPath);
  for (const video of videos) {
    const videoPath = path.join(inputPath, video);
    const compressedVideoPath = path.join(outputPath, video);
    try {
      await $`ffmpeg -i ${videoPath} -vcodec libx265 -crf 28 -preset slow ${compressedVideoPath}`;
    } catch (error) {
      console.error(`Error compressing file ${video}: ${error}`);
    }
  }
}
