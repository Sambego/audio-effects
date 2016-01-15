export default class SingleAudioNode {
    constructor(audioContext) {
        this._audioContext = audioContext;
    }

    get node() {
        return this._node;
    }

    set node(node) {
        return this._node = node;
    }

    connect(node) {
        // Check if the node is one created by pedalboard.js
        //  otherwise assume it's a native one.
        if (node.node) {
            this._node.connect(node.node);
        } else {
            this._node.connect(node);
        }

        return node;
    }

    disconnect() {
        this._node.disco

        return this._node;nnect();
    }
};
