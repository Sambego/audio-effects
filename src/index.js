import {hasAudioContext} from './helpers/hasAudioContext'
import Input from './audioNodes/Input';
import Output from './audioNodes/Output';
import Volume from './audioNodes/Volume';
import Distortion from './audioNodes/Distortion';

const defaultConfig = {};

export default class Pedalboard {
    constructor(c) {
        if (!hasAudioContext) {
            throw new Error('Your browser can not create an audioContext, please upgrade or use another browser!')
        }

        this.config = Object.assign({}, defaultConfig, c);
        this.audioContext = new AudioContext();
    }

    input() {
        return new Input(this.audioContext);
    }

    output() {
        return new Output(this.audioContext);
    }

    volume() {
        return new Volume(this.audioContext);
    }

    distortion() {
        return new Distortion(this.audioContext);
    }
};

// Put the class on the window for temporary testing purposes
!function() {
    window.Pedalboard = Pedalboard;
}();