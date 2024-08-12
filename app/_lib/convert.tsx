import { $ } from 'execa';
import fs from 'fs';
import path from 'path';

export async function batchConvert(inputPath: string, outPutPath: string) {
  const files = fs
    .readdirSync(inputPath)
    .filter((fileName: string) => isVideo(fileName.trim()));
  const summary: string[] = [];
  for (let index = 0; index < files.length; index++) {
    const fileName = files[index];
    try {
      console.log(`start converting ${files[index]}...`);
      const expectedExt = 'mp4';
      const ext = path.extname(fileName);
      const outputFileName = !fileName.endsWith(expectedExt)
        ? fileName.replace(ext, `.${expectedExt}`)
        : fileName;
      await $`ffmpeg -loglevel error -i ${path.join(
        inputPath,
        fileName
      )} -c:a copy -s hd720 -ac 2 ${path.join(outPutPath, outputFileName)}`;
      summary.push(`${index + 1} of ${files.length}. ${fileName} converted`);
    } catch (error) {
      console.error(`Error converting file ${fileName}: ${error}`);
      summary.push(`${index + 1} of ${files.length}. ${fileName} failed`);
    }
    console.log(summary.join('\n'));
  }
}

function isVideo(fileName: string): boolean {
  return (
    fileName.endsWith('.mp4') ||
    fileName.endsWith('.avi') ||
    fileName.endsWith('.mkv') ||
    fileName.endsWith('.mov') ||
    fileName.endsWith('.webm')
  );
}
