import * as _ from 'lodash';
import {SingleAudioNode} from '../SingleAudioNode';
import {MultiAudioNode} from '../MultiAudioNode';
import {HasGetUserMedia} from '../../helpers/HasGetUserMedia'

/**
 * The audio-effects input node.
 * This class lets you set an input audio source or access the  uses' microphone.
 */
export class Input extends SingleAudioNode {
    private _deferredConnects: Array<AudioNode>;
    private _hasPermissions: boolean;

    constructor(audioContext: AudioContext) {
        super(audioContext);

        this._deferredConnects = [];
        this._hasPermissions = false;
    }

    /**
     * Getter for the effects input node.
     * @return {AudioNode}
     */
    public get input() : AudioNode|MediaStream {
        return <AudioNode>this.node;
    }

    /**
     * Setter for the effects input node.
     * @param  {AudioStream} stream
     */
    public set input(stream: AudioNode|MediaStream) {
        // Create a media-stream source.
        this.node = this.audioContext.createMediaStreamSource(<MediaStream>stream);
    }

    /**
     * Get your microphone sound as input.
     * @return {Promise<AudioNode>} Resolves when you accept to use the microphone.
     */
    public getUserMedia() : Promise<any> {
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
     * @param  {AudioNode|SingleAudioNode|MultiAudioNode} node
     * @return {AudioNode|SingleAudioNode|MultiAudioNode}
     */
    public connect(node: AudioNode|SingleAudioNode|MultiAudioNode) : AudioNode|SingleAudioNode|MultiAudioNode {
        // If there is no input node yet, connect when there is a node
        if (typeof this.node === 'undefined') {
            this._deferredConnects.push(<AudioNode>node);

            return node;
        }

        // Check if the node is a Audio-effects AudioNode,
        //  otherwise assume it's a native one.
        if ((<SingleAudioNode|MultiAudioNode>node).node) {
            this.node.connect((<SingleAudioNode|MultiAudioNode>node).node);
        } else {
            this.node.connect(<AudioNode>node);
        }

        return node;
    }

    /**
     * Get a list of audio in-and-output devices devices.
     * @return {Promise<Array<any>>} A list of the available audio in-and-output devices.
     */
    public getAudioDevices() : Promise<Array<any>>{
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
