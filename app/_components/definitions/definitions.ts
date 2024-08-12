interface ClipAmount {
  amount: number;
  name: string;
}

interface ClipInfo {
  inputIdentifier: string;
  start?: string;
  end?: string;
  description?: string;
  name?: string;
}

interface VideosClipsAmountProps {
  videos: FileList | null;
  clipsAmount: Array<{ amount: number; name: string }>;

  recordClipsAmount: (item: ClipAmount) => void;
}

interface TimeSlotsProps {
  clipsAmount: ClipAmount[];
  updateClipInfo: (item: ClipInfo) => void;
  clipInfo: ClipInfo[];
}

export type { ClipAmount, ClipInfo, VideosClipsAmountProps, TimeSlotsProps };
