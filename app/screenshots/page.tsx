'use client';
import * as React from 'react';
import { takeScreenShots } from '../actions/actions';
const { useState } = React;

export default function Home() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  return (
    <div>
      <h1>take screenshot with interval</h1>
      <div className='pt-10 videos'>
        <form action='' id='files-form'>
          <h2>Upload Video Files</h2>
          <input type='file' name='video' id='files' required />
          <h2>interval </h2>
          <input
            type='number'
            name='interval'
            id='interval'
            min='1'
            max='100'
            required
          />
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
                takeScreenShots(formData).then((res) => {
                  setIsCompleted(true);
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
