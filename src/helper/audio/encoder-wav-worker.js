export default function () {
  // Parts copied from https://github.com/chris-rudmin/Recorderjs
  const BYTES_PER_SAMPLE = 2;
  const CHANNELS = 1; // 1=mono , 2=Stereo
  let recorded = [];

  function encode(buffer) {
    const { length } = buffer;
    const data = new Uint8Array(length * BYTES_PER_SAMPLE * CHANNELS);
    for (let i = 0; i < length; i += 1) {
      const index = i * BYTES_PER_SAMPLE * CHANNELS;
      let sample = buffer[i];
      if (sample > 1) {
        sample = 1;
      } else if (sample < -1) {
        sample = -1;
      }
      sample *= 32768;
      data[index] = sample;
      // eslint-disable-next-line no-bitwise
      data[index + 1] = sample >> 8;
    }
    recorded.push(data);
  }

  function dump(sampleRate) {
    const bufferLength = recorded.length ? recorded[0].length : 0;
    const length = recorded.length * bufferLength;
    const wav = new Uint8Array(44 + length);

    const view = new DataView(wav.buffer);

    // RIFF identifier 'RIFF'
    view.setUint32(0, 1380533830, false);
    // file length minus RIFF identifier length and file description length
    view.setUint32(4, 36 + length, true);
    // RIFF type 'WAVE'
    view.setUint32(8, 1463899717, false);
    // format chunk identifier 'fmt '
    view.setUint32(12, 1718449184, false);
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, 1, true);
    // channel count
    view.setUint16(22, CHANNELS, true);
    // sample rate
    view.setUint32(24, sampleRate, true); // 44100 Khz
    // byte rate (channels * sample rate * block align)
    view.setUint32(28, CHANNELS * sampleRate * BYTES_PER_SAMPLE, true); // kbps = 1411
    // block align (channel count * bytes per sample)
    view.setUint16(32, CHANNELS * BYTES_PER_SAMPLE, true);
    // bits per sample
    view.setUint16(34, 8 * BYTES_PER_SAMPLE, true); // 16
    // data chunk identifier 'data'
    view.setUint32(36, 1684108385, false);
    // data chunk length
    view.setUint32(40, length, true);

    for (let i = 0; i < recorded.length; i += 1) {
      wav.set(recorded[i], i * bufferLength + 44);
    }

    recorded = [];
    const msg = [wav.buffer];
    postMessage(msg, [msg[0]]);
  }

  this.onmessage = e => {
    if (e.data[0] === 'encode') {
      encode(e.data[1]);
    } else if (e.data[0] === 'dump') {
      dump(e.data[1]);
    } else if (e.data[0] === 'close') {
      this.close();
    }
  };
}
