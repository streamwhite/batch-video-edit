function isEmpty(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' &&
      value !== null &&
      Object.keys(value).length === 0)
  );
}

export function hasEmptyValue(obj: any): boolean {
  function checkEmptyValue(obj: any): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (isEmpty(obj[key])) {
          return true;
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (checkEmptyValue(obj[key])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  return checkEmptyValue(obj);
}

export function getVideosAndClips(formData: FormData) {
  const videos = Array.from(formData.getAll('video'));
  const clips = videos
    .map((_, index) => {
      const clips = formData.getAll(`video-${index + 1}-clips`);
      return clips.map((clip) => JSON.parse(clip.toString()));
    })
    .flat(2);
  return { videos, clips };
}
