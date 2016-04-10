import {hasAudioContext} from './helpers/hasAudioContext';
import {AudioNodeWrapper} from './audioNodes/SingleAudioNodeWrapper';
import Input from './audioNodes/Input';
import Output from './audioNodes/Output';
import Volume from './audioNodes/Volume';
import Distortion from './audioNodes/Distortion';

const DEFAULT_CONFIG = {};
const NATIVE_AUDIO_NODES = ['Analyser', 'BiquadFilter', 'Buffer', 'BufferSource', 'ChannelMerger', 'ChannelSplitter', 'Convolver', 'Delay', 'DynamicsCompressor', 'Gain', 'MediaElementSource', 'MediaStreamDestination', 'MediaStreamSource', 'Oscillator', 'Panner', 'PeriodicWave', 'ScriptProcessor', 'StereoPanner', 'WaveShaper'];
const PEDALBOARD_AUDIO_NODES = [{
        name: 'Input',
        node: Input
    }, {
        name: 'Output',
        node: Output
    }, {
        name: 'Volume',
        node: Volume
    }, {
        name: 'Distortion',
        node: Distortion
}];

const createNativeAudioNodeWrapper = function(pedalboard, audioContext) {
    NATIVE_AUDIO_NODES.forEach(node => {
        pedalboard[`create${node}`] = function() {
            return new AudioNodeWrapper(audioContext, `create${node}`);
        };
    });
};

const createPedalboardAudioNodes = function(pedalboard, audioContext) {
    PEDALBOARD_AUDIO_NODES.forEach(node => {
        pedalboard[`create${node.name}`] = function() {
            return new node.node(audioContext);
        };
    });
};

export default class Pedalboard {
    constructor(config) {
        if (!hasAudioContext) {
            throw new Error('Your browser can not create an audioContext, please upgrade or use another browser!')
        }

        this.config = Object.assign({}, DEFAULT_CONFIG, config);
        this.audioContext = new AudioContext();

        createNativeAudioNodeWrapper(this, this.audioContext);
        createPedalboardAudioNodes(this, this.audioContext);
    }
};

// Put the class on the window for temporary testing purposes
!function() {
    window.Pedalboard = Pedalboard;
}();
