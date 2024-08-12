import { $ } from 'execa';
import fs from 'fs';
import path from 'path';
import { removeFileExt } from './file-naming';
export async function screenshotsWithInterval(
  inputPath: string,
  outPutFolder: string,
  interval: number
) {
  const videos = fs.readdirSync(inputPath);
  for (let index = 0; index < videos.length; index++) {
    const video = videos[index];
    const videoPath = path.join(inputPath, video);
    const fileName = removeFileExt(video);
    const command = `ffmpeg -i ${videoPath} -vf fps=1/${interval} ${outPutFolder}/${fileName}-%4d.png`;
    await $(command);
  }
}
