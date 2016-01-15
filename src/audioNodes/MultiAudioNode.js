import SingleAudioNode from './SingleAudioNode';

export default class MultiAudioNode extends SingleAudioNode {
    get output() {
        return this._node;
    }

    set output(output) {
        return this._outputNode = output;
    }

    connect(node) {
        // Check if the node is one created by pedalboard.js
        //  otherwise assume it's a native one.
        if (node.node) {
            this._outputNode.connect(node.node);
        } else {
            this._outputNode.connect(node);
        }

        return node;
    }

    disconnect() {
        this._outputNode.disconnect();

        return this._outputNode;
    }
};
