import { format as formatDate } from 'date-fns';
import { $ } from 'execa';
import fs from 'fs';
import path from 'path';

const isVideo = (filename: string): boolean =>
  /\.(mov|mp4|avi|mkv|webm)$/i.test(filename);

interface VideoInfo {
  codec_long_name: string;
  width: number;
  height: number;
  duration: string;
  creation_time: string;
  filename: string;
}

const getVideoInfo = async (
  videoName: string,
  videoParentPath: string
): Promise<VideoInfo> => {
  const inputPath = path.join(videoParentPath, videoName);
  const { stdout } =
    await $`ffprobe -v quiet -print_format json -show_format -show_streams ${inputPath}`;

  const { format, streams } = JSON.parse(stdout);
  const {
    duration,
    tags: { creation_time },
    filename,
  } = format;
  const { codec_long_name, width, height } = streams[0];

  return {
    codec_long_name,
    width,
    height,
    duration,
    creation_time,
    filename,
  };
};

export async function renameIphoneVideosWithMeta(
  videosParentPath: string,
  outputFolderPath: string
): Promise<void> {
  const videosName: string[] = fs.readdirSync(videosParentPath).filter(isVideo);
  for (const fullName of videosName) {
    const ext = fullName.split('.').pop();
    const { codec_long_name, creation_time } = await getVideoInfo(
      fullName,
      videosParentPath
    );
    const codecType = codec_long_name.split('/')[0].trim() ?? '';
    const newFileName = `${
      formatDate(new Date(creation_time), 'yyyy-MM-dd-HH-mm-ss') ?? ''
    }-${codecType}.${ext}`;
    const inputPath = path.join(videosParentPath, fullName);
    const outputPath = path.join(outputFolderPath, newFileName);
    await $`mv ${inputPath} ${outputPath}`;
  }
}
