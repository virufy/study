import * as Yup from 'yup';
import { getDuration } from '../helper/getDuration';

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
      const duration = await getDuration(audio);
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
