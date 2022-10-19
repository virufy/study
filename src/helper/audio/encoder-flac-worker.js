/* eslint-disable */
/* eslint-disable func-names */
/* global Flac */

export default function () {
  const workersHost = process.env.PUBLIC_URL || process.env.REACT_APP_WORKERS_HOST || 'https://virufy.org/study';
  importScripts(`${workersHost}/workers/encoders/libflac.dev.js`); // eslint-disable-line

  let flacEncoder;
  let CHANNELS = 1;
  let SAMPLERATE = 44100;
  let COMPRESSION = 5;
  let BPS = 16;
  let flacOk = 1;
  let flacLength = 0;
  const flacBuffers = [];
  let INIT = false;
  const wavBuffers = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function writeCallbackFn(buffer, bytes) {
    flacBuffers.push(buffer);
    flacLength += buffer.byteLength;
  }

  // HELPER: handle initialization of flac encoder
  function initFlac() {
    flacEncoder = Flac.create_libflac_encoder(SAMPLERATE, CHANNELS, BPS, COMPRESSION, 0);
    /// /
    if (flacEncoder !== 0) {
      const statusEncoder = Flac.init_encoder_stream(flacEncoder, writeCallbackFn);
      flacOk &= (statusEncoder == 0);

      console.log(`flac init     : ${flacOk}`);// DEBUG
      console.log(`status encoder: ${statusEncoder}`);// DEBUG

      INIT = true;
    } else {
      console.error('Error initializing the encoder.');
    }
  }

  function init(config) {
    let finalConfig = config;

    if (!finalConfig) {
      finalConfig = {
        bps: BPS, channels: CHANNELS, samplerate: SAMPLERATE, compression: COMPRESSION,
      };
    }

    finalConfig.channels = finalConfig.channels ? finalConfig.channels : CHANNELS;
    finalConfig.samplerate = finalConfig.samplerate ? finalConfig.samplerate : SAMPLERATE;
    finalConfig.bps = finalConfig.bps ? finalConfig.bps : BPS;
    finalConfig.compression = finalConfig.compression ? finalConfig.compression : COMPRESSION;

    /// /
    COMPRESSION = finalConfig.compression;
    BPS = finalConfig.bps;
    SAMPLERATE = finalConfig.samplerate;
    CHANNELS = finalConfig.channels;
    /// /

    if (!Flac.isReady()) {
      Flac.onready = function () {
        setTimeout(() => {
          initFlac();
        }, 0);
      };
    } else {
      initFlac();
    }
  }

  // HELPER: actually encode PCM data to Flac
  function doEncodeFlac(audioData) {
    const bufLength = audioData.length;
    const bufferI32 = new Uint32Array(bufLength);
    const view = new DataView(bufferI32.buffer);
    const volume = 1;
    let index = 0;
    for (let i = 0; i < bufLength; i += 1) {
      view.setInt32(index, (audioData[i] * (0x7FFF * volume)), true);
      index += 4;
    }

    const flacReturn = Flac.FLAC__stream_encoder_process_interleaved(
      flacEncoder, bufferI32, bufferI32.length / CHANNELS,
    );
    if (flacReturn != true) {
      console.log(`Error: encode_buffer_pcm_as_flac returned false. ${flacReturn}`);
    }
  }

  // HELPER: handle incoming PCM audio data for Flac encoding:
  function encodeFlac(audioData) {
    if (!Flac.isReady()) {
      // if Flac is not ready yet: buffer the audio
      wavBuffers.push(audioData);
      console.info('buffered audio data for Flac encdoing');
    } else {
      if (wavBuffers.length > 0) {
        // if there is buffered audio: encode buffered first (and clear buffer)

        const len = wavBuffers.length;
        const buffered = wavBuffers.splice(0, len);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < len; ++i) {
          doEncodeFlac(buffered[i]);
        }
      }

      doEncodeFlac(audioData);
    }
  }

  function mergeBuffersUint8(channelBuffer, recordingLength) {
    const result = new Uint8Array(recordingLength);
    let offset = 0;
    const lng = channelBuffer.length;
    for (let i = 0; i < lng; i += 1) {
      const buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
    }
    return result;
  }

  function exportFlacFile(recBuffers, recLength) {
    // convert buffers into one single buffer
    const samples = mergeBuffersUint8(recBuffers, recLength);

    // var audioBlob = new Blob([samples], { type: type });
    const theBlob = new Blob([samples], { type: 'audio/flac' });
    return theBlob;
  }

  /*
   * clear recording buffers
   */
  function clear() {
    flacBuffers.splice(0, flacBuffers.length);
    flacLength = 0;
    wavBuffers.splice(0, wavBuffers.length);
  }

  this.onmessage = function onmessage(e) {
    if (e.data[0] === 'init') {
      init(e.data[1]);
    } else if (e.data[0] === 'encode') {
      encodeFlac(e.data[1]);
    } else if (e.data[0] === 'dump') {
      let data;
      if (!Flac.isReady()) {
        console.error('Flac was not initialized: could not encode data!');
      } else {
        flacOk &= Flac.FLAC__stream_encoder_finish(flacEncoder);
        console.log(`flac finish: ${flacOk}`);// DEBUG
        data = exportFlacFile(flacBuffers, flacLength);

        Flac.FLAC__stream_encoder_delete(flacEncoder);
      }

      clear();

      postMessage(data);
      INIT = false;
    }
  };
}
