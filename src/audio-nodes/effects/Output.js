import SingleAudioNode from '../SingleAudioNode';

/**
 * The audio-effects output class.
 * This class connects to your device's audio output.
 */
export default class Output extends SingleAudioNode{
    constructor(audioContext) {
        super(audioContext);

        if (this._audioContext) {
            this._node = audioContext.destination;
        }
    }
}
