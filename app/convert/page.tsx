'use client';
import * as React from 'react';
import { convertVideos } from '../actions/actions';
const { useState } = React;

export default function Home() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  // add state 'isInProgress' to disable the start button when the conversion is in progress
  const [isInProgress, setIsInProgress] = useState<boolean>(false);
  return (
    <div>
      <h1>Convert videos to MP4</h1>
      <div className='pt-10 videos'>
        <h2>Upload Video Files</h2>
        <div className=''>
          <form action='' id='files-form'>
            <input type='file' name='video' id='files' multiple required />
            {}
            <button
              id='start'
              type='submit'
              disabled={isInProgress}
              onClick={(e) => {
                setIsInProgress(true);
                setIsCompleted(false);
                e.preventDefault();
                const form = document.getElementById(
                  'files-form'
                ) as HTMLFormElement;
                const formData = new FormData(form);
                convertVideos(formData).then((res) => {
                  setIsCompleted(true);
                  setIsInProgress(false);
                });
              }}
            >
              start
            </button>
          </form>
        </div>
      </div>
      {isCompleted ? (
        <div className='progress'>all video files are converted</div>
      ) : null}
    </div>
  );
}
