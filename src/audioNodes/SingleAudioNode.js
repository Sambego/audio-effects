/**
 * The basic audio node class.
 * This is de skeleton for a pedalboard effect.
 * When the effect only contains 1 audioNode this class can be used.
 */
export default class AudioNode {
    constructor(audioContext) {
        // Set the audio-context.
        this._audioContext = audioContext;
    }

    /**
     * The effect's audio-node getter.
     * @return {AudioNode} The audio-node used for the effect.
     */
    get node() {
        return this._node;
    }

    /**
     * The effect's audio-node setter.
     * @param  {AudioNode} node
     * @return {AudioNode}
     */
    set node(node) {
        return this._node = node;
    }

    /**
     * Connect the effect to other effects or native audio-nodes.
     * @param  {Native AudioNode | Pedalboard AudioNode} node
     * @return {Native AudioNode | Pedalboard AudioNode}
     */
    connect(node) {
        // Check if the node is a Pedalboard AudioNode,
        //  otherwise assume it's a native one.
        if (node.node) {
            this.node.connect(node.node);
        } else {
            this.node.connect(node);
        }

        return node;
    }

    /**
     * disconnect the effect.
     * @return {Pedalboard AudioNode}
     */
    disconnect() {
        this.node.disconnect();

        return this.node;
    }

    /**
     * Alias for the disconnect method, to offer the same api as a MultiAudioNode.
     * @return {Pedalboard AudioNode}
     */
    destroy() {
        return this.disconnect();
    }
};
