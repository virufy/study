import { isSafari } from 'react-device-detect';

export function getDuration(e: HTMLAudioElement, remove?: boolean): Promise<number> {
  return new Promise(resolver => {
    if (e.duration !== Infinity
        && (!isSafari
        || (isSafari && e.duration > 0))) {
      resolver(e.duration);
      return;
    }
    e.addEventListener('durationchange', () => {
      if (remove) {
        e.remove();
      } else {
        e.pause();
        e.volume = 1;
        e.currentTime = 0;
      }
      resolver(e.duration);
    });
    e.currentTime = 24 * 60 * 60; // Unprobable time
    e.play();
  });
}
