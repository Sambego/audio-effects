import {MultiAudioNode} from '../MultiAudioNode';

/**
 * The audio-effects reverb class.
 * This class lets you add a reverb effect.
 */
export class Reverb extends MultiAudioNode {
    private _wet: number;
    private _level: number;
    private _buffer: AudioBuffer|ArrayBuffer;

    constructor(audioContext: AudioContext, buffer: AudioBuffer) {
        super(audioContext);

        this.nodes = {
            inputGainNode: audioContext.createGain(), // Create the input and output gain-node
            outputGainNode: audioContext.createGain(),
            convolverNode: audioContext.createConvolver(), // Create the convolver node to create the reverb effect
            wetGainNode: audioContext.createGain(), // Create the wetness controll gain-node
            levelGainNode: audioContext.createGain() // Create the level controll gain-node
        };

        // Wire it all up
        this.nodes['inputGainNode'].connect(this.nodes['convolverNode']);
        this.nodes['inputGainNode'].connect(this.nodes['wetGainNode']);
        this.nodes['convolverNode'].connect(this.nodes['levelGainNode']);
        this.nodes['levelGainNode'].connect(this.nodes['outputGainNode']);
        this.nodes['wetGainNode'].connect(this.nodes['outputGainNode']);

        // Set the input gain-node as the input-node.
        this.node = this.nodes['inputGainNode'];

        // Set the output gain-node as the output-node.
        this.output = this.nodes['outputGainNode'];

        // Set the default wetness to 0.5
        this.wet = 0.5;

        // Set the default level to 1
        this.level = 1;

        // Set the convolver buffer
        if (buffer) {
            this.buffer = buffer;
        } else {
            this.getInputResponseFile().then(buffer => {
                this.buffer = buffer;
            });
        }
    }

    /**
     * Get the standard input responsefile.
     * @return {Promise<AudioBuffer>}
     */
    private getInputResponseFile() : Promise<ArrayBuffer|AudioBuffer>{
        return fetch('../../audio/hall-reverb.ogg', {
            method: 'get'
        }).then(response => {
            return response.arrayBuffer();
        });
    }

    /**
     * Getter for the effect's wetness
     * @return {number}
     */
    public get wet() : number|string {
        return this._wet;
    }

    /**
     * Setter for the effect's wetness
     * @param  {number} wetness
     */
    public set wet(wetness: number|string) {
        // Set the internal wetness value
        this._wet = parseFloat(<string>wetness);

        // Set the new value for the wetness controll gain-node
        (<GainNode>this.nodes['wetGainNode']).gain.value = this._wet;
    }

    /**
     * Getter for the effect's level
     * @return {number}
     */
    public get level() : number|string{
        return this._level;
    }

    /**
     * Setter for the effect's level
     * @param  {number} level
     */
    public set level(level: number|string) {
        // Set the internal level value
        this._level = parseFloat(<string>level);

        // Set the delayTime value of the delay-node
        (<GainNode>this.nodes['levelGainNode']).gain.value = this._level;
    }

    /**
     * Getter for the effect's convolver buffer
     * @return {Buffer}
     */
    public get buffer() : AudioBuffer|ArrayBuffer{
        return this._buffer;
    }

    /**
     * Setter for the effect's convolver buffer
     * @param  {Stream} buffer
     */
    public set buffer(buffer: AudioBuffer|ArrayBuffer) {
        this.audioContext.decodeAudioData(<ArrayBuffer>buffer, buffer => {
            // Set the internal buffer value
            this._buffer = buffer;

            // Set the buffer gain-node value
            (<ConvolverNode>this.nodes['convolverNode']).buffer = this._buffer;
        });
    }
};
