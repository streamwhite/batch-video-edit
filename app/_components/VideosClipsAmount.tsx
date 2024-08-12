import { VideosClipsAmountProps } from './definitions/definitions';

export default function VideosClipsAmount({
  videos,
  clipsAmount,
  recordClipsAmount,
}: VideosClipsAmountProps) {
  return (
    <ol>
      {videos &&
        Array.from(videos).map((video, index) => (
          <li key={video.name} className='pt-4'>
            <div className='clips-amount'>
              <p className='name'>{video.name} clips amount</p>
              <input
                type='number'
                name={`clips-${index}`}
                id={`clips-${index}`}
                required
                min={1}
                onChange={(e) => {
                  const clips = clipsAmount.slice();
                  clips[index] = {
                    amount: parseInt(e.target.value),
                    name: video.name,
                  };
                  recordClipsAmount(clips[index]);
                }}
              />
            </div>
          </li>
        ))}
    </ol>
  );
}
