import {SingleAudioNode} from './SingleAudioNode';

/**
 * Wrap a native audio-node so we can chain it when connecting.
 */
export class AudioNodeWrapper extends SingleAudioNode {
    public node: AudioNode;

    constructor(audioContext: AudioContext, type: string) {
        super(audioContext);

        this.node = audioContext[type]();
    }
};
