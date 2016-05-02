import MultiAudioNode from '../MultiAudioNode';

// "Private" varibles
let _inputGainNode, _outputGainNode, _wetGainNode, _durationGainNode, _delayNode;

/**
 * The pedalboard delay class.
 * This class lets you add a delay effect.
 */
export default class Delay extends MultiAudioNode {
    constructor(audioContext) {
        super(audioContext);

        // Create the input and output nodes of the effect
        _inputGainNode = audioContext.createGain();
        _outputGainNode = audioContext.createGain();

        // Create the gain-node we'll use to controll the wetness of the delay
        _wetGainNode = audioContext.createGain();

        // Create the gain node we'll use to controll the duration of the delay
        _durationGainNode = audioContext.createGain();

        // Create the delay node
        _delayNode = audioContext.createDelay();

        // Wire it all up
        _inputGainNode.connect(_wetGainNode);
        _inputGainNode.connect(_delayNode);
        _durationGainNode.connect(_delayNode);
        _delayNode.connect(_durationGainNode);
        _delayNode.connect(_outputGainNode)
        _wetGainNode.connect(_outputGainNode)

        // Set the input gain-node as the input-node.
        this._node = _inputGainNode;
        // Set the output gain-node as the output-node.
        this._outputNode = _outputGainNode;

        // Set the default wetness to 1
        this.wet = 1;

        // Set the default speed to 1 second
        this.speed = 1;

        // Set the default duration to 0.4
        this.duration = 0.4;
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
     * Getter for the effect's speed
     * @return {Float}
     */
    get speed() {
        return this._speed;
    }

    /**
     * Setter for the effect's speed
     * @param  {Float} speed
     * @return {Float}
     */
    set speed(speed) {
        // Set the internal speed value
        this._speed = parseFloat(speed);

        // Set the delayTime value of the delay-node
        _delayNode.delayTime.value = this._speed;

        return this._speed;
    }

    /**
     * Getter for the effect's duration
     * @return {Float}
     */
    get duration() {
        return this._duration;
    }

    /**
     * Setter for the effect's duration
     * @param  {Float} duration
     * @return {Float}
     */
    set duration(duration) {
        // Set the internal duration value
        this._duration = parseFloat(duration);

        // Set the duration gain-node value
        _durationGainNode.gain.value = this._duration;

        return this._duration;
    }
};
