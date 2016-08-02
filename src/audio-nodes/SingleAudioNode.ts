/**
 * The basic audio node class.
 * This is de skeleton for a audio  effect.
 * When the effect only contains 1 audioNode this class can be used.
 */
export class SingleAudioNode {
    private _audioContext: AudioContext;
    private _node: AudioNode;

    public nodes: {[key: string]: AudioNode|GainNode|DelayNode|WaveShaperNode|BiquadFilterNode|OscillatorNode|ConvolverNode} = {};

    constructor(audioContext: AudioContext) {
        // Set the audio-context.
        this._audioContext = audioContext;
    }

    /**
     * The effects AudioContext getter.
     * @return {AudioContext} The AudioContext used by the effect.
     */
    public get audioContext() : AudioContext {
        return this._audioContext;
    }

    /**
     * The effects AudioContext setter.
     * @param  {AudioContext} audioContext
     */
    public set audioContext(audioContext: AudioContext) {
        this._audioContext = audioContext;
    }

    /**
     * The effect's audio-node getter.
     * @return {AudioNode} The audio-node used for the effect.
     */
    public get node() : AudioNode|GainNode {
        return this._node;
    }

    /**
     * The effect's audio-node setter.
     * @param  {AudioNode} node
     * @return {AudioNode}
     */
    public set node(node: AudioNode|GainNode) {
        this._node = node;
    }

    /**
     * Connect the effect to other effects or native audio-nodes.
     * @param  {AudioNode|SingleAudioNode} node
     * @return {AudioNode|SingleAudioNode}
     */
    public connect(node: AudioNode|SingleAudioNode) : AudioNode|SingleAudioNode {
        // Check if the node is a Audio-effects AudioNode,
        //  otherwise assume it's a native one.
        if ((<SingleAudioNode>node).node) {
            this.node.connect((<SingleAudioNode>node).node);
        } else {
            this.node.connect((<AudioNode>node));
        }

        return node;
    }

    /**
     * disconnect the effect.
     * @return {AudioNode}
     */
    public disconnect() : AudioNode {
        this.node.disconnect();

        return this.node;
    }

    /**
     * Alias for the disconnect method, to offer the same api as a MultiAudioNode.
     * @return {AudioNode}
     */
    public destroy() : AudioNode {
        return this.disconnect();
    }
};
