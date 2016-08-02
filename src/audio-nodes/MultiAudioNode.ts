import {SingleAudioNode} from './SingleAudioNode';

/**
 * The multi-audio-node class.
 * When creating an effect existing out of multiple audio-nodes, we can wrap it in this class.
 * You can set the input node (effect.node) and the output node of the effect (effect.output).
 * The input node is the first audio-node in the effect, the previous effect will be connected to this node.
 * The output node is the last audio-node in the effect, the next effect will be connected to this node.
 */
export class MultiAudioNode extends SingleAudioNode {
    private _outputNode: AudioNode;

    constructor(audioContext: AudioContext) {
        super(audioContext);
    }

    /**
     * Getter for the effects output node.
     * @return {AudioNode}
     */
    get output() : AudioNode {
        return this._outputNode;
    }

    /**
     * Setter for the effects output node.
     * @param  {AudioNode} output
     * @return {AudioNode}
     */
    set output(output: AudioNode) {
        this._outputNode = output;
    }

    /**
     * Connect the effect to other effects or native audio-nodes.
     * @param  {AudioNode|SingleAudioNode|MultiAudioNode} node
     * @return {AudioNode|SingleAudioNode|MultiAudioNode}
     */
    public connect(node: AudioNode|SingleAudioNode|MultiAudioNode) : AudioNode|SingleAudioNode|MultiAudioNode {
        // Check if the node is one created by audio-effects
        //  otherwise assume it's a native one.
        if ((<SingleAudioNode|MultiAudioNode>node).node) {
            this.output.connect((<SingleAudioNode|MultiAudioNode>node).node);
        } else {
            this.output.connect((<AudioNode>node));
        }

        return node;
    }

    /**
     * Disconnect the effect.
     * @return {AudioNode}
     */
    public disconnect() : AudioNode {
        this.output.disconnect();

        return this.output;
    }

    /**
     * Destroy an effect.
     * @return {AudioNode}
     */
    public destroy() : AudioNode {
        Object.keys(this.nodes).forEach(node => {
            if (this.nodes[node].disconnect && typeof this.nodes[node].disconnect === 'function') {
                this.nodes[node].disconnect();
            }
        });

        return this.disconnect()
    }
};
