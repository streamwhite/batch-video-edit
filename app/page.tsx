'use client';
import * as React from 'react';
import VideosClipsAmount from './_components/VideosClipsAmount';
import { ClipAmount, ClipInfo } from './_components/definitions/definitions';
const { useState, useRef, useEffect } = React;

import ms from 'ms';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipInfoUI from './_components/ClipInfo';
import { getVideosAndClips, hasEmptyValue } from './_lib/utils';
import { clipVideos } from './actions/actions';

export default function Home() {
  const notify = () =>
    toast.info('Please fill all fields before Start Clipping!');

  const progressRef = useRef<HTMLDivElement>(null);

  const [videos, setVideos] = useState<FileList | null>(null);
  const hasVideo = videos && videos.length > 0;

  const [clipsAmount, setClipsAmount] = useState<ClipAmount[]>([]);

  const [clipInfo, setClipInfo] = useState<ClipInfo[]>([]);
  function recordClipsAmount(item: ClipAmount) {
    const hasSameInput = clipsAmount.some((clip) => clip.name === item.name);
    if (!hasSameInput) {
      setClipsAmount([...clipsAmount, item]);
    } else {
      const clips = clipsAmount.map((clip) => {
        if (clip.name === item.name) {
          return item;
        }
        return clip;
      });
      setClipsAmount(clips);
    }
  }
  function updateClipInfo(singleClipInfo: ClipInfo) {
    const hasSameClipInfo = clipInfo.some(
      (clip) => clip.inputIdentifier === singleClipInfo.inputIdentifier
    );
    if (hasSameClipInfo) {
      const slots = clipInfo.map((slot) => {
        if (slot.inputIdentifier === singleClipInfo.inputIdentifier) {
          return { ...slot, ...singleClipInfo };
        }
        return slot;
      });
      setClipInfo(slots);
    } else {
      setClipInfo([...clipInfo, singleClipInfo]);
    }
  }
  function generateFormData() {
    const formData = new FormData();
    videos &&
      Array.from(videos).forEach((video, index) => {
        const { amount, name } = clipsAmount[index];
        const clipArray = [];
        for (let i = 0; i < amount; i++) {
          const clipInfoIndex = index + i;
          const clip = clipInfo[clipInfoIndex];
          clipArray.push({
            start: clip.start,
            end: clip.end,
            description: clip.description,
            name,
          });
        }
        formData.append(`video`, video);
        formData.append(`video-${index + 1}-clips`, JSON.stringify(clipArray));
      });
    return formData;
  }

  const timeUsedRef = useRef<number>(0);
  const clippingStartTimeRef = useRef<number>(0);

  function validateEmpty(formData: FormData) {
    const { clips: clipsInfo } = getVideosAndClips(formData);
    return clipsInfo.some(
      (clip) => hasEmptyValue(clip) || Object.keys(clip).length !== 4
    );
  }

  function handleStart() {
    const formData = generateFormData();
    if (validateEmpty(formData)) {
      return notify();
    }
    clippingStartTimeRef.current = Date.now();
    setIsInClipping(true);
    setIsComplete(false);
    clipVideos(formData).then((res) => {
      timeUsedRef.current = Date.now() - clippingStartTimeRef.current;
      setIsComplete(true);
      setIsInClipping(false);
    });
  }

  const [isComplete, setIsComplete] = useState(false);
  const [isInClipping, setIsInClipping] = useState(false);
  useEffect(() => {
    progressRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isComplete]);

  return (
    <main>
      <h1>Batch Clip Videos</h1>
      <div className='pt-10 videos'>
        <h2>Upload Video Files</h2>
        <div className=''>
          <form action='' id='files-form'>
            <input
              type='file'
              name='files'
              id='files'
              multiple
              required
              onChange={(e) => {
                setClipsAmount([]);
                setIsComplete(false);
                setVideos(e.target.files);
              }}
            />
          </form>
        </div>
      </div>
      <div className={`videos ${hasVideo ? '' : 'hide'}`}>
        <form action=''>
          <h2>Clips Amount for Each Video</h2>
          <VideosClipsAmount
            videos={videos}
            recordClipsAmount={recordClipsAmount}
            clipsAmount={clipsAmount}
          />
        </form>
      </div>
      <div className={`timeslots ${hasVideo ? '' : 'hide'}`}>
        <h2>Time Slots</h2>
        <form action='' id='times-form'>
          <ClipInfoUI
            clipsAmount={clipsAmount}
            updateClipInfo={updateClipInfo}
            clipInfo={clipInfo}
          />
        </form>
      </div>
      <div className={`start-clip ${hasVideo ? '' : 'hide'}`}>
        <button id='start-clip' onClick={handleStart} disabled={isInClipping}>
          {isInClipping ? 'Clipping' : 'Start'}
        </button>
      </div>
      <div className='progress' ref={progressRef}>
        {isComplete ? (
          <p>
            All clips Are finished with{' '}
            {ms(timeUsedRef.current, { long: true })}. Find your clips in the
            project <span className='folder'>output</span> folder
          </p>
        ) : null}
      </div>
      <ToastContainer />
    </main>
  );
}
