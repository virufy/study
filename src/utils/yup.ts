import * as Yup from 'yup';
import { isSafari } from 'react-device-detect';

Yup.addMethod(Yup.mixed, 'validateAudioLength', function validate(maxDuration: number) {
  // @ts-ignore
  return this.test('fileDuration', 'ERROR.FILE_DURATION', async (value?: any) => {
    if (value) {
      const file = value as File;
      const audio = new Audio(URL.createObjectURL(file));
      audio.defaultMuted = true;
      audio.muted = true;
      audio.load();
      await new Promise(resolver => audio.addEventListener('loadedmetadata', resolver));
      const duration: number = await new Promise(resolver => {
        if (audio.duration !== Infinity
          && (!isSafari
          || (isSafari && audio.duration > 0))) {
          resolver(audio.duration);
          return;
        }
        audio.addEventListener('durationchange', () => {
          audio.remove();
          resolver(audio.duration);
        });
        audio.currentTime = 24 * 60 * 60; // Unprobable time
        audio.play();
      });
      return (duration >= maxDuration);
    }
    return !!value;
  });
});

Yup.addMethod(Yup.mixed, 'validateAudioSize', function validate(audioMaxSizeInMb: number) {
  // @ts-ignore
  return this.test('fileSize', 'ERROR.FILE_SIZE', (value?: any) => {
    if (value) {
      const file = value as File;
      const { size } = file;
      return (size <= 1024 ** 3 * audioMaxSizeInMb);
    }
    return !!value;
  });
});

export default Yup;
