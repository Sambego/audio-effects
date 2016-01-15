import SingleAudioNode from './SingleAudioNode';

export default class Output extends SingleAudioNode{
    constructor(audioContext) {
        super(audioContext);

        if (this._audioContext) {
            this._node = audioContext.destination;
        }
    }
}
