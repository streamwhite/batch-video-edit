import React from 'react';
import { TimeSlotsProps } from './definitions/definitions';

export default function ClipInfoUI({
  clipsAmount,
  updateClipInfo,
  clipInfo,
}: TimeSlotsProps) {
  return (
    <ol>
      {clipsAmount.map((clip, index) => {
        const { amount } = clip;
        return (
          <li key={clip.name} className='pt-4'>
            <div className='time-slot'>
              <p className='name'>{clip.name} clip info</p>
              {amount > 0 &&
                Array(amount)
                  .fill(0)
                  .map((_, i) => {
                    const startId = `movie${index + 1}-start-${i + 1}`;
                    const endId = `movie${index + 1}-end-${i + 1}`;
                    const descriptionId = `movie${index + 1}-description-${
                      i + 1
                    }`;
                    const inputIdentifier = `${clip.name}-clipInfo-${i + 1}`;
                    const clipInfoIndex = index + i;
                    return (
                      <div key={i} className='time-slot-item'>
                        <h4>{amount >= 2 ? `clip ${i + 1}` : null}</h4>
                        <label htmlFor={startId}>start time</label>
                        <input
                          type='text'
                          name={startId}
                          id={startId}
                          required
                          onBlur={(e) => {
                            const slots1 = [...clipInfo];
                            slots1[clipInfoIndex] = {
                              inputIdentifier: inputIdentifier,
                              start: e.target.value,
                            };
                            updateClipInfo(slots1[clipInfoIndex]);
                          }}
                        />
                        <label htmlFor={endId}>end time</label>
                        <input
                          type='text'
                          name={endId}
                          id={endId}
                          required
                          onBlur={(e) => {
                            const slots2 = [...clipInfo];
                            slots2[clipInfoIndex] = {
                              inputIdentifier: inputIdentifier,
                              end: e.target.value,
                            };
                            updateClipInfo(slots2[clipInfoIndex]);
                          }}
                        />
                        <label htmlFor={descriptionId}>clip description</label>
                        <input
                          type='text'
                          name={descriptionId}
                          id={descriptionId}
                          required
                          onBlur={(e) => {
                            const slots3 = [...clipInfo];
                            slots3[clipInfoIndex] = {
                              inputIdentifier: inputIdentifier,
                              description: e.target.value,
                            };
                            updateClipInfo(slots3[clipInfoIndex]);
                          }}
                        />
                      </div>
                    );
                  })}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
