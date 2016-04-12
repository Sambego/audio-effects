import _ from 'lodash';
import SingleAudioNode from '../SingleAudioNode';
import HasGetUserMedia from '../../helpers/HasGetUserMedia'

/**
 * The pedalboard input node.
 * This class lets you set an input audio source or access the  uses' microphone.
 */
export default class Input extends SingleAudioNode {
    constructor(audioContext) {
        super(audioContext);

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
