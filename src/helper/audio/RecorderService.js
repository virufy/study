/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
// Vendor Library https://github.com/mogwai/pwa-audio-recorder/tree/master

import EncoderWav from './encoder-wav-worker';
import EncoderMp3 from './encoder-mp3-worker';
import EncoderFlac from './encoder-flac-worker';
// import EncoderOgg from './encoder-ogg-worker';

export default class RecorderService {
  constructor(config) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    this.em = document.createDocumentFragment();

    this.state = 'inactive';

    this.chunks = [];
    this.chunkType = '';

    this.encoderMimeType = 'audio/wav';

    this.config = {
      broadcastAudioProcessEvents: config.broadcastAudioProcessEvents !== undefined ? config.broadcastAudioProcessEvents : false,
      createAnalyserNode: config.createAnalyserNode !== undefined ? config.createAnalyserNode : false,
      createDynamicsCompressorNode: config.createDynamicsCompressorNode !== undefined ? config.createDynamicsCompressorNode : false,
      forceScriptProcessor: config.forceScriptProcessor !== undefined ? config.forceScriptProcessor : false,
      manualEncoderId: config.manualEncoderId !== undefined ? config.manualEncoderId : 'wav',
      micGain: config.micGain !== undefined ? config.micGain : 1.0,
      processorBufferSize: config.processorBufferSize !== undefined ? config.processorBufferSize : 2048,
      stopTracksAndCloseCtxWhenFinished: config.stopTracksAndCloseCtxWhenFinished !== undefined ? config.stopTracksAndCloseCtxWhenFinished : true,
      usingMediaRecorder: config.usingMediaRecorder !== undefined ? config.usingMediaRecorder : typeof window.MediaRecorder !== 'undefined',
      enableEchoCancellation: config.enableEchoCancellation !== undefined ? config.enableEchoCancellation : true,
      sampleRate: config.sampleRate !== undefined ? config.sampleRate : 44100,
      onRecording: config.onRecording,
      onAudioPress: config.onAudioPress,
    };

    if (config.onRecording) {
      this.recordingFn = evt => config.onRecording(evt);
      this.em.addEventListener('recording', this.recordingFn);
    }
    if (config.onAudioProcesss) {
      this.onAudioProcessFn = evt => config.onAudioProcesss(evt);
      this.em.addEventListener('onaudioprocess', this.onAudioProcessFn);
    }
  }

  cleanup = () => {
    if (this.config.onRecording) {
      this.em.removeEventListener('recording', this.recordingFn);
    }
    if (this.config.onAudioProcesss) {
      this.em.removeEventListener('onaudioprocess', this.onAudioProcessFn);
    }
  };

  createWorker = fn => {
    const js = fn
      .toString()
      .replace(/^function\s*\(\)\s*{/, '')
      .replace(/}$/, '');
    const blob = new Blob([js]);
    return new Worker(URL.createObjectURL(blob));
  };

  startRecording = timeslice => {
    if (this.state !== 'inactive') {
      return;
    }

    // This is the case on ios/chrome, when clicking links from within ios/slack (sometimes), etc.
    if (
      !navigator
      || !navigator.mediaDevices
      || !navigator.mediaDevices.getUserMedia
    ) {
      // alert('Missing support for navigator.mediaDevices.getUserMedia'); // temp: helps when testing for strange issues on ios/safari
      return;
    }

    this.audioCtx = new AudioContext({
      sampleRate: this.config.sampleRate,
    });
    this.micGainNode = this.audioCtx.createGain();
    this.outputGainNode = this.audioCtx.createGain();

    if (this.config.createDynamicsCompressorNode) {
      this.dynamicsCompressorNode = this.audioCtx.createDynamicsCompressor();
    }

    if (this.config.createAnalyserNode) {
      this.analyserNode = this.audioCtx.createAnalyser();
    }

    // If not using MediaRecorder(i.e. safari and edge), then a script processor is required. It's optional
    // on browsers using MediaRecorder and is only useful if wanting to do custom analysis or manipulation of
    // recorded audio data.
    if (
      this.config.forceScriptProcessor
      || this.config.broadcastAudioProcessEvents
      || !this.config.usingMediaRecorder
    ) {
      this.processorNode = this.audioCtx.createScriptProcessor(
        this.config.processorBufferSize,
        1,
        1,
      ); // TODO: Get the number of channels from mic
    }

    // Create stream destination on chrome/firefox because, AFAICT, we have no other way of feeding audio graph output
    // in to MediaRecorderSafari/Edge don't have this method as of 2018-04.
    if (this.audioCtx.createMediaStreamDestination) {
      this.destinationNode = this.audioCtx.createMediaStreamDestination();
    } else {
      this.destinationNode = this.audioCtx.destination;
    }

    // Create web worker for doing the encoding
    if (!this.config.usingMediaRecorder) {
      if (this.config.manualEncoderId === 'mp3') {
        this.encoderWorker = this.createWorker(EncoderMp3);
        const baseUrl = process.env.PUBLIC_URL || 'https://virufy.org/study';
        this.encoderWorker.postMessage([
          'init',
          { baseUrl, sampleRate: this.audioCtx.sampleRate },
        ]);
        this.encoderMimeType = 'audio/mpeg';
      } else if (this.config.manualEncoderId === 'flac') {
        this.encoderWorker = this.createWorker(EncoderFlac);
        this.encoderWorker.postMessage([
          'init',
          { sampleRate: this.audioCtx.sampleRate },
        ]);
        this.encoderMimeType = 'audio/flac';
      } else {
        this.encoderWorker = this.createWorker(EncoderWav);
        this.encoderMimeType = 'audio/wav';
      }
      this.encoderWorker.addEventListener('message', e => {
        const event = new Event('dataavailable');
        if (this.config.manualEncoderId === 'ogg' || this.config.manualEncoderId === 'flac') {
          event.data = e.data;
        } else {
          event.data = new Blob(e.data, { type: this.encoderMimeType });
        }
        this._onDataAvailable(event);
      });
    }

    // Setup media constraints
    const userMediaConstraints = {
      audio: {
        echoCancellation: this.config.enableEchoCancellation,
      },
    };
    if (this.config.deviceId) {
      userMediaConstraints.audio.deviceId = this.config.deviceId;
    }

    // This will prompt user for permission if needed
    return navigator.mediaDevices
      .getUserMedia(userMediaConstraints)
      .then(stream => {
        this._startRecordingWithStream(stream, timeslice);
      })
      .catch(error => {
        // alert(`Error with getUserMedia: ${error.message}`); // temp: helps when testing for strange issues on ios/safari
        console.log(error);
      });
  };

  setMicGain = newGain => {
    this.config.micGain = newGain;
    if (this.audioCtx && this.micGainNode) {
      this.micGainNode.gain.setValueAtTime(newGain, this.audioCtx.currentTime);
    }
  };

  _startRecordingWithStream = (stream, timeslice) => {
    this.micAudioStream = stream;

    this.inputStreamNode = this.audioCtx.createMediaStreamSource(
      this.micAudioStream,
    );
    this.audioCtx = this.inputStreamNode.context;

    // Kind-of a hack to allow hooking in to audioGraph inputStreamNode
    if (this.onGraphSetupWithInputStream) {
      this.onGraphSetupWithInputStream(this.inputStreamNode);
    }

    this.inputStreamNode.connect(this.micGainNode);
    this.micGainNode.gain.setValueAtTime(
      this.config.micGain,
      this.audioCtx.currentTime,
    );

    let nextNode = this.micGainNode;
    if (this.dynamicsCompressorNode) {
      this.micGainNode.connect(this.dynamicsCompressorNode);
      nextNode = this.dynamicsCompressorNode;
    }

    this.state = 'recording';

    if (this.processorNode) {
      nextNode.connect(this.processorNode);
      this.processorNode.connect(this.outputGainNode);
      this.processorNode.onaudioprocess = e => this._onAudioProcess(e);
    } else {
      nextNode.connect(this.outputGainNode);
    }

    if (this.analyserNode) {
      // TODO: If we want the analyser node to receive the processorNode's output, this needs to be changed _and_
      //       processor node needs to be modified to copy input to output. It currently doesn't because it's not
      //       needed when doing manual encoding.
      // this.processorNode.connect(this.analyserNode)
      nextNode.connect(this.analyserNode);
    }

    this.outputGainNode.connect(this.destinationNode);

    if (this.config.usingMediaRecorder) {
      this.mediaRecorder = new MediaRecorder(this.destinationNode.stream, { mimeType: this.encoderMimeType });
      this.mediaRecorder.addEventListener('dataavailable', evt => this._onDataAvailable(evt));
      this.mediaRecorder.addEventListener('error', evt => this._onError(evt));

      this.mediaRecorder.start(timeslice);
    } else {
      // Output gain to zero to prevent feedback. Seems to matter only on Edge, though seems like should matter
      // on iOS too.  Matters on chrome when connecting graph to directly to audioCtx.destination, but we are
      // not able to do that when using MediaRecorder.
      this.outputGainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      // this.outputGainNode.gain.value = 0

      // Todo: Note that time slicing with manual wav encoderWav won't work. To allow it would require rewriting the encoderWav
      // to assemble all chunks at end instead of adding header to each chunk.
      if (timeslice) {
        console.log(
          'Time slicing without MediaRecorder is not yet supported. The resulting recording will not be playable.',
        );
        this.slicing = setInterval(function anon() {
          if (this.state === 'recording') {
            this.encoderWorker.postMessage(['dump', this.context.sampleRate]);
          }
        }, timeslice);
      }
    }
  };

  _onAudioProcess = e => {
    // console.log('onaudioprocess', e)
    // let inputBuffer = e.inputBuffer
    // let outputBuffer = e.outputBuffer
    // console.log(this.micAudioStream)
    // console.log(this.audioCtx)
    // console.log(this.micAudioStream.getTracks().forEach((track) => console.log(track)))

    // this.onAudioEm.dispatch(new Event('onaudioprocess', {inputBuffer:inputBuffer,outputBuffer:outputBuffer}))

    if (this.config.broadcastAudioProcessEvents) {
      this.em.dispatchEvent(
        new CustomEvent('onaudioprocess', {
          detail: {
            inputBuffer: e.inputBuffer,
            outputBuffer: e.outputBuffer,
          },
        }),
      );
    }

    // // Example handling:
    // let inputBuffer = e.inputBuffer
    // let outputBuffer = e.outputBuffer
    // // Each channel (usually only one)
    // for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
    //   let inputData = inputBuffer.getChannelData(channel)
    //   let outputData = outputBuffer.getChannelData(channel)
    //
    //   // Each sample
    //   for (let sample = 0; sample < inputBuffer.length; sample++) {
    //     // Make output equal to the same as the input (thus processor is doing nothing at this time)
    //     outputData[sample] = inputData[sample]
    //   }
    // }

    // When manually encoding (safari/edge), there's no reason to copy data to output buffer.  We set the output
    // gain to 0 anyways (which is required on Edge if we did copy data to output). However, if using a MediaRecorder
    // and a processor (all other browsers), then it would be required to copy the data otherwise the graph would
    // generate no data for the MediaRecorder to consume.
    // if (this.forceScriptProcessor) {

    // // Copy input to output
    // let inputBuffer = e.inputBuffer
    // let outputBuffer = e.outputBuffer
    // // This doesn't work on iOS/Safari. Guessing it doesn't have copyToChannel support, but haven't verified.
    // for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
    //   outputBuffer.copyToChannel(inputBuffer.getChannelData(channel), channel)
    // }

    // Safari and Edge require manual encoding via web worker. Single channel only for now.
    // Example stereo encoderWav: https://github.com/MicrosoftEdge/Demos/blob/master/microphone/scripts/recorderworker.js
    if (!this.config.usingMediaRecorder) {
      if (this.state === 'recording') {
        if (this.config.broadcastAudioProcessEvents) {
          this.encoderWorker.postMessage([
            'encode',
            e.outputBuffer.getChannelData(0),
          ]);
        } else {
          this.encoderWorker.postMessage([
            'encode',
            e.inputBuffer.getChannelData(0),
          ]);
        }
      }
    }
  };

  stopRecording = () => {
    if (this.state === 'inactive') {
      return;
    }
    if (this.config.usingMediaRecorder) {
      this.state = 'inactive';
      this.mediaRecorder.stop();
    } else {
      this.state = 'inactive';
      this.encoderWorker.postMessage(['dump', this.audioCtx.sampleRate]);
      clearInterval(this.slicing);

      // TODO: There should be a more robust way to handle this
      // Without something like this, I think  the last recorded sample could be lost due to timing
      // setTimeout(() => {
      //   this.state = 'inactive'
      //   this.encoderWorker.postMessage(['dump', this.audioCtx.sampleRate])
      // }, 100)
    }
  };

  _onDataAvailable = evt => {
    // console.log('state', this.mediaRecorder.state)
    // console.log('evt.data', evt.data)

    this.chunks.push(evt.data);
    this.chunkType = evt.data.type;

    if (this.state !== 'inactive') {
      return;
    }

    const blob = new Blob(this.chunks, { type: this.chunkType });
    const blobUrl = URL.createObjectURL(blob);
    const recording = {
      ts: new Date().getTime(),
      blobUrl,
      mimeType: blob.type,
      size: blob.size,
    };

    this.chunks = [];
    this.chunkType = null;

    if (this.destinationNode) {
      this.destinationNode.disconnect();
      this.destinationNode = null;
    }
    if (this.outputGainNode) {
      this.outputGainNode.disconnect();
      this.outputGainNode = null;
    }
    if (this.analyserNode) {
      this.analyserNode.disconnect();
      this.analyserNode = null;
    }
    if (this.processorNode) {
      this.processorNode.disconnect();
      this.processorNode = null;
    }
    if (this.encoderWorker) {
      this.encoderWorker.postMessage(['close']);
      this.encoderWorker = null;
    }
    if (this.dynamicsCompressorNode) {
      this.dynamicsCompressorNode.disconnect();
      this.dynamicsCompressorNode = null;
    }
    if (this.micGainNode) {
      this.micGainNode.disconnect();
      this.micGainNode = null;
    }
    if (this.inputStreamNode) {
      this.inputStreamNode.disconnect();
      this.inputStreamNode = null;
    }

    if (this.config.stopTracksAndCloseCtxWhenFinished) {
      // This removes the red bar in iOS/Safari
      this.micAudioStream.getTracks().forEach(track => track.stop());
      this.micAudioStream = null;

      this.audioCtx.close();
      this.audioCtx = null;
    }

    this.em.dispatchEvent(
      new CustomEvent('recording', { detail: { recording } }),
    );
  };

  _onError = evt => {
    console.log('error', evt);
    this.em.dispatchEvent(new Event('error'));
    // alert(`error:${evt}`); // for debugging purposes
  };
}
