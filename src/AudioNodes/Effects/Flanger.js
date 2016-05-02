import MultiAudioNode from '../MultiAudioNode';

// "Private" varibles
let _inputGainNode, _delayNode, _wetGainNode, _gainNode, _feedbackGainNode, _oscillatorNode;

/**
 * The pedalboard flanger class.
 * This class lets you add a flanger effect.
 */
export default class Flanger extends MultiAudioNode {
    constructor(audioContext) {
        super(audioContext);

        // Create the input gain-node
        _inputGainNode = audioContext.createGain();

        // Create the wetness controll gain-node
        _wetGainNode = audioContext.createGain();

        // Create the delay node
        _delayNode = audioContext.createDelay();

        // Create the gain controll gain-node
	    _gainNode = audioContext.createGain();

        // Create the feedback controll gain-node
    	_feedbackGainNode = audioContext.createGain();

        // Create the oscilator node
    	_oscillatorNode = audioContext.createOscillator();
        _oscillatorNode.type = 'sine';
        _oscillatorNode.start(0);

        // Wire it all up
	    _oscillatorNode.connect(_gainNode);
	    _gainNode.connect(_delayNode.delayTime);
	    _inputGainNode.connect(_wetGainNode);
	    _inputGainNode.connect(_delayNode);
	    _delayNode.connect(_wetGainNode);
	    _delayNode.connect(_feedbackGainNode);
	    _feedbackGainNode.connect(_inputGainNode);

        // Set the input gain-node as the input-node.
        this._node = _inputGainNode;
        // Set the output gain-node as the output-node.
        this._outputNode = _wetGainNode;

        // Set the default delay of 0.005 seconds
        this.delay = 0.005;

        // Set the default depth to 0.002;
        this.depth = 0.002

        // Set the default feedback to 0.5
        this.feedback = 0.5;

        // Set the default speed to 0.25Hz
        this.speed = 0.25
    }

    /**
     * Getter for the effect's delay
     * @return {Float}
     */
    get delay() {
        return this._delay;
    }

    /**
     * Setter for the effect's delay
     * @param  {Float} delay
     * @return {Float}
     */
    set delay(delay) {
        // Set the internal delay value
        this._delay = parseFloat(delay);

        // Set the new value for the delay-node
        _delayNode.delayTime.value = this._delay;

        return this._delay;
    }

    /**
     * Getter for the effect's depth
     * @return {Float}
     */
    get depth() {
        return this._depth;
    }

    /**
     * Setter for the effect's depth
     * @param  {Float} depth
     * @return {Float}
     */
    set depth(depth) {
        // Set the internal depth value
        this._depth = parseFloat(depth);

        // Set the gain value of the gain-node
        _gainNode.gain.value = this._depth;

        return this._depth;
    }

    /**
     * Getter for the effect's feedback
     * @return {Float}
     */
    get feedback() {
        return this._feedback;
    }

    /**
     * Setter for the effect's feedback
     * @param  {Float} feedback
     * @return {Float}
     */
    set feedback(feedback) {
        // Set the internal feedback value
        this._feedback = parseFloat(feedback);

        // Set the feedback gain-node value
        _feedbackGainNode.gain.value = this._feedback;

        return this._feedback;
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

        // Set the speed gain-node value
        _oscillatorNode.frequency.value = this._speed;

        return this._speed;
    }
};
