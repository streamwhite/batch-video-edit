'use client';
import * as React from 'react';
import { compressVideos } from '../actions/actions';
const { useState } = React;

export default function Home() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  return (
    <div>
      <h1>Compress videos</h1>
      <div className='pt-10 videos'>
        <form action='' id='files-form'>
          <h2>Upload Video Files</h2>
          <input type='file' name='video' id='files' multiple required />

          {}
          <div>
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
                compressVideos(formData).then((res) => {
                  if (res?.isCompleted) {
                    setIsCompleted(true);
                  }
                  setIsInProgress(false);
                });
              }}
            >
              start
            </button>
          </div>
        </form>
      </div>
      {isCompleted ? (
        <div className='progress'>all video files are compressed</div>
      ) : null}
    </div>
  );
}
