import AudioNode from './SingleAudioNode';

/**
 * Wrap a native audio-node so we can chain it when connecting.
 */
export default class AudioNodeWrapper extends AudioNode {
    constructor(audioContext, type) {
        super(audioContext);

        this.node = audioContext[type]();

        return this.node;
    }
};
