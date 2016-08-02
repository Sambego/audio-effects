import {SingleAudioNode} from '../SingleAudioNode';

/**
 * The audio-effects output class.
 * This class connects to your device's audio output.
 */
export class Output extends SingleAudioNode{
    constructor(audioContext: AudioContext) {
        super(audioContext);

        if (this.audioContext) {
            this.node = audioContext.destination;
        }
    }
}
