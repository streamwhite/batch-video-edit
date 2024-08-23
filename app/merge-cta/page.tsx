'use client';
import * as React from 'react';
import { concatCTA } from '../actions/actions';
const { useState } = React;

export default function Home() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  return (
    <div>
      <h1>merge call to action video</h1>
      <div className='pt-10 videos'>
        <form action='' id='files-form'>
          <h2>Upload Video Files</h2>
          <input type='file' name='video' id='files' multiple required />
          <h2>Upload call to action file </h2>
          <input type='file' name='cta' id='cta' required />

          {}
          <div>
            <button
              id='start'
              type='submit'
              disabled={isInProgress}
              onClick={(e) => {
                setIsInProgress(true);
                e.preventDefault();
                setIsCompleted(false);
                const form = document.getElementById(
                  'files-form'
                ) as HTMLFormElement;
                const formData = new FormData(form);
                concatCTA(formData).then((res) => {
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
        <div className='progress'>all video files are merged with CTA</div>
      ) : null}
    </div>
  );
}
