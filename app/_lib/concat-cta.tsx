import { $ } from 'execa';
import * as path from 'path';
interface ConcatCTAParams {
  videos: string[];
  outPutPath: string;
  CTA: string;
  inputPath: string;
}

export async function concatCTA({
  videos,
  outPutPath,
  CTA,
  inputPath,
}: ConcatCTAParams) {
  for (let index = 0; index < videos.length; index++) {
    console.log(`start processing file ${videos[index]}`);
    const filePath = path.join(inputPath, videos[index]);
    const fileName = path.basename(filePath);
    const command = `ffmpeg  -loglevel error -i ${filePath} -i ${CTA} -filter_complex "[0:v:0][0:a:0][1:v:0][1:a:0]concat=n=2:v=1:a=1[outv][outa]" -map "[outv]" -map "[outa]" ${path.join(
      outPutPath,
      fileName
    )}`;
    try {
      await $(command);
    } catch (error) {
      console.error(`Error processing file ${fileName}: ${error}`);
    }
  }
}
