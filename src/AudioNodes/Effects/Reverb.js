import MultiAudioNode from '../MultiAudioNode';

// "Private" varibles
let _inputGainNode, _convolverNode, _wetGainNode, _levelGainNode, _outputGainNode;

// Load the input response file
const _getInputResponseFile = function getInputResponseFile() {
    return fetch('src/audio/hall-reverb.ogg', {
        method: 'get'
    }).then(response => {
        return response.arrayBuffer();
    });
}

/**
 * The pedalboard reverb class.
 * This class lets you add a reverb effect.
 */
export default class Reverb extends MultiAudioNode {
    constructor(audioContext, buffer) {
        super(audioContext);

        // Set the audioContext
        this.audioContext = audioContext;

        // Create the input and output gain-node
        _inputGainNode = audioContext.createGain();
        _outputGainNode = audioContext.createGain();

        // Create the convolver node to create the reverb effect
        _convolverNode = audioContext.createConvolver();

        // Create the wetness controll gain-node
        _wetGainNode = audioContext.createGain();

        // Create the level controll gain-node
        _levelGainNode = audioContext.createGain();

        // Wire it all up
        _inputGainNode.connect(_convolverNode);
        _inputGainNode.connect(_wetGainNode);
        _convolverNode.connect(_levelGainNode);
        _levelGainNode.connect(_outputGainNode);
        _wetGainNode.connect(_outputGainNode);

        // Set the input gain-node as the input-node.
        this._node = _inputGainNode;
        // Set the output gain-node as the output-node.
        this._outputNode = _outputGainNode;

        // Set the default wetness to 0.5
        this.wet = 0.5;

        // Set the default level to 1
        this.level = 1;

        // Set the convolver buffer
        if (buffer) {
            this.buffer = buffer;
        } else {
            _getInputResponseFile().then(buffer => {
                this.buffer = buffer;
            });
        }
    }

    /**
     * Getter for the effect's wetness
     * @return {Float}
     */
    get wet() {
        return this._wet;
    }

    /**
     * Setter for the effect's wetness
     * @param  {Float} wetness
     * @return {Float}
     */
    set wet(wetness) {
        // Set the internal wetness value
        this._wet = parseFloat(wetness);

        // Set the new value for the wetness controll gain-node
        _wetGainNode.gain.value = this._wet;

        return this._wet;
    }

    /**
     * Getter for the effect's level
     * @return {Float}
     */
    get level() {
        return this._level;
    }

    /**
     * Setter for the effect's level
     * @param  {Float} level
     * @return {Float}
     */
    set level(level) {
        // Set the internal level value
        this._level = parseFloat(level);

        // Set the delayTime value of the delay-node
        _levelGainNode.gain.value = this._level;

        return this._level;
    }

    /**
     * Getter for the effect's convolver buffer
     * @return {Buffer}
     */
    get buffer() {
        return this._buffer;
    }

    /**
     * Setter for the effect's convolver buffer
     * @param  {Stream} buffer
     * @return {Buffer}
     */
    set buffer(buffer) {
        return this.audioContext.decodeAudioData(buffer, buffer => {
            // Set the internal buffer value
            this._buffer = buffer;

            // Set the buffer gain-node value
            _convolverNode.buffer = this._buffer;

            return this._buffer;
        });
    }
};
