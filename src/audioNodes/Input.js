import SingleAudioNode from './SingleAudioNode';
import {hasGetUserMedia} from '../helpers/hasGetUserMedia'

export default class Input extends SingleAudioNode {
    get node() {
        return this._node;
    }

    set node(stream) {
        this._node = this._audioContext.createMediaStreamSource(input);

        return this._node;
    }

    getUserMedia() {
        return new Promise((resolve, reject) =>{
            if (hasGetUserMedia) {
                navigator.getUserMedia({
                    audio: true
                }, stream => {
                    this._node = this._audioContext.createMediaStreamSource(stream);

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
