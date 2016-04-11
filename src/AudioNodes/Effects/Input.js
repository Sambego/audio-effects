import SingleAudioNode from '../SingleAudioNode';
import HasGetUserMedia from '../../helpers/HasGetUserMedia'

/**
 * The pedalboard input node.
 * This class lets you set an input audio source or access the  uses' microphone.
 */
export default class Input extends SingleAudioNode {
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

                    resolve(stream);
                },  e => {
                    reject(e)
                });
            } else {
                reject('Your browser does not support the use of user-media, please upgrade or use another browser!')
            }
        });
    }
};
