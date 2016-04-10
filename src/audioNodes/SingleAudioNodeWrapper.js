import AudioNode from './SingleAudioNode';

export class AudioNodeWrapper extends AudioNode {
    constructor(audioContext, type) {
        super(audioContext);

        this._node = audioContext[type]();
    }
};
