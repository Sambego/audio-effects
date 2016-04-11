import SingleAudioNode from './SingleAudioNode';

/**
 * The multi-audio-node class.
 * When creating an effect existing out of multiple audio-nodes, we can wrap it in this class.
 * You can set the input node (effect.node) and the output node of the effect (effect.output).
 * The input node is the first audio-node in the effect, the previous effect will be connected to this node.
 * The output node is the last audio-node in the effect, the next effect will be connected to this node.
 */
export default class MultiAudioNode extends SingleAudioNode {
    /**
     * Getter for the effects output node.
     * @return {AudioNode}
     */
    get output() {
        return this._outputNode;
    }

    /**
     * Setter for the effects output node.
     * @param  {AudioNode} output
     * @return {AudioNode}
     */
    set output(output) {
        return this._outputNode = output;
    }

    /**
     * Connect the effect to other effects or native audio-nodes.
     * @param  {Native AudioNode | Pedalboard AudioNode} node
     * @return {Native AudioNode | Pedalboard AudioNode}
     */
    connect(node) {
        // Check if the node is one created by pedalboard.js
        //  otherwise assume it's a native one.
        if (node.node) {
            this.output.connect(node.node);
        } else {
            this.output.connect(node);
        }

        return node;
    }

    /**
     * disconnect the effect.
     * @return {Pedalboard AudioNode}
     */
    disconnect() {
        this.output.disconnect();

        return this.output;
    }
};
