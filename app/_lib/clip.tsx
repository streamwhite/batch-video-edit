import { $ } from 'execa';

import filenamify from 'filenamify';
import path from 'path';
import { ClipInfo } from '../_components/definitions/definitions';
import { ToColonedDigits } from '../_lib/date';
import { removeFileExt } from './file-naming';
import * as wrappedFs from './fs';
function replaceColonWithDash(time: string) {
  return time.replace(/:/g, '-');
}

async function clip(
  clipInfo: ClipInfo[],
  summary: string[] = [],
  uploadPath: string = 'uploads'
) {
  const outPutFolder = 'output';
  wrappedFs.ensureDirAsync(outPutFolder);
  for (let index = 0; index < clipInfo.length; index++) {
    console.log(`Start ${index + 1} of ${clipInfo.length}`);
    const {
      start = '',
      end = '',
      description,
      name: videoFullName,
    } = clipInfo[index];
    const movieName = removeFileExt(videoFullName ?? '');
    const generatedClipFileName = filenamify(
      `${movieName}-${description}-from-${replaceColonWithDash(
        start as string
      )}-to-${replaceColonWithDash(end as string)}.mp4`
    );
    const inputPath = path.join(uploadPath, videoFullName ?? '');
    const outPutPath = path.join(outPutFolder, generatedClipFileName);

    try {
      await $`ffmpeg -loglevel error -i ${inputPath} -y -ss ${ToColonedDigits(
        start
      )} -to ${ToColonedDigits(end)} -map 0:a:0 -map 0:v:0 -ac 2 ${outPutPath}`;
      summary.push(
        `${index + 1} of ${clipInfo.length}. ${generatedClipFileName} done`
      );
    } catch (error) {
      console.error('An error occurred:', error);
      summary.push(
        `${index + 1} of ${clipInfo.length}. ${generatedClipFileName} failed`
      );
    }
  }
  console.log(summary.join('\n'));
}

export { clip };
