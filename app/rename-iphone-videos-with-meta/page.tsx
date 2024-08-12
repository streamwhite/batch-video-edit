'use client';
import * as React from 'react';
import { renameVideosWithMeta } from '../actions/actions';
const { useState } = React;

export default function Home() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  return (
    <div>
      <h1>Rename Iphone Videos With Meta</h1>
      <div className='pt-10 videos'>
        <form action='' id='files-form'>
          <h2>Upload Video Files</h2>
          <input type='file' name='video' id='files' required />
          <div>
            <button
              id='start'
              type='submit'
              onClick={(e) => {
                setIsCompleted(false);
                e.preventDefault();
                const form = document.getElementById(
                  'files-form'
                ) as HTMLFormElement;
                const formData = new FormData(form);
                renameVideosWithMeta(formData).then((res) => {
                  if (res?.isCompleted) {
                    setIsCompleted(true);
                  }
                });
              }}
            >
              start
            </button>
          </div>
        </form>
      </div>
      {isCompleted ? (
        <div className='progress'>all video are renamed</div>
      ) : null}
    </div>
  );
}
