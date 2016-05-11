import _ from 'lodash';
import SingleAudioNode from '../SingleAudioNode';
import HasGetUserMedia from '../../helpers/HasGetUserMedia'

/**
 * The audio-effects input node.
 * This class lets you set an input audio source or access the  uses' microphone.
 */
export default class Input extends SingleAudioNode {
    constructor(audioContext) {
        super(audioContext);

        this._deferredConnects = [];
        this._hasPermissions = false;
    }

    /**
     * Getter for the effects input node.
     * @return {[type]} [description]
     */
    get input() {
        return this._node;
    }

    /**
     * Setter for the effects input node.
     * @param  {AudioStrea,} stream
     * @return {AudioNode}
     */
    set input(stream) {
        // Create a media-stream source.
        this._node = this._audioContext.createMediaStreamSource(stream);

        return this._node;
    }

    /**
     * Get your microphone sound as input.
     * @return {Promise} Resolves when you accept to use the microphone.
     */
    getUserMedia() {
        return new Promise((resolve, reject) =>{
            if (HasGetUserMedia) {
                navigator.getUserMedia({
                    audio: true
                }, stream => {
                    this.input = stream;
                    this._hasPermissions = true;

                    // Connect the deffered connects
                    this._deferredConnects.forEach(node => {
                        this.connect(node);
                    });

                    resolve(stream);
                }, error => {
                    reject(error);
                });
            } else {
                reject('Your browser does not support the use of user-media, please upgrade or use another browser!')
            }
        });
    }

    /**
     * Connect the effect to other effects or native audio-nodes.
     * @param  {Native AudioNode | Audio-effects AudioNode} node
     * @return {Native AudioNode | Audio-effects AudioNode}
     */
    connect(node) {
        // If there is no input node yet, connect when there is a node
        if (typeof this._node === 'undefined') {
            this._deferredConnects.push(node);

            return;
        }

        // Check if the node is a Audio-effects AudioNode,
        //  otherwise assume it's a native one.
        if (node.node) {
            this.node.connect(node.node);
        } else {
            this.node.connect(node);
        }

        return node;
    }

    /**
     * Get a list of audio in-and-output devices devices.
     * @return {Array} A list of the available audio in-and-output devices.
     */
    getAudioDevices() {
        return new Promise((resolve, reject) =>{
            if (this._hasPermissions) {
                navigator.mediaDevices.enumerateDevices().then(devices => {
                    resolve(_.filter(devices, {kind: 'audioinput'}));
                }).catch(error => {
                    reject(error);
                });
            } else {
                this.getUserMedia().then(() => {
                    navigator.mediaDevices.enumerateDevices().then(devices => {
                        resolve(_.filter(devices, {kind: 'audioinput'}));
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            }
        });
    }
};
