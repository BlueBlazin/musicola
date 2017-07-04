import Tone from 'tone';


let distortion = new Tone.Distortion(0.6);
let tremolo = new Tone.Tremolo().start();
let stereo = new Tone.StereoEffect();
let volume = new Tone.Volume(-16);
let ping = new Tone.PingPongDelay(.05, .3).toMaster();
let fmsynth = new Tone.FMSynth({
  "modulationIndex": 12.22,
  "envelope": {
    "attack": 0.03,
    "decay": 0.5
  },
  "modulation": {
    "type": "sine"
  },
  "modulationEnvelope": {
    "attack": 0.5,
    "decay": 0.03
  }
});

let synth = new Tone.PolySynth(30, Tone.FMSynth).chain(volume, ping);

module.exports = { synth };




























 //
