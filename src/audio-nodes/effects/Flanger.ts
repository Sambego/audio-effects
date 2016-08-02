import {MultiAudioNode} from '../MultiAudioNode';

/**
 * The audio-effects flanger class.
 * This class lets you add a flanger effect.
 */
export class Flanger extends MultiAudioNode {
    private _delay: number;
    private _depth: number;
    private _feedback: number;
    private _speed: number;

    constructor(audioContext: AudioContext) {
        super(audioContext);

        this.nodes = {
            inputGainNode: audioContext.createGain(), // Create the input gain-node
            wetGainNode: audioContext.createGain(), // Create the wetness controll gain-node
            delayNode: audioContext.createDelay(), // Create the delay node
    	    gainNode: audioContext.createGain(), // Create the gain controll gain-node
        	feedbackGainNode: audioContext.createGain(), // Create the feedback controll gain-node
        	oscillatorNode: audioContext.createOscillator() // Create the oscilator node
        };

        // Wire it all up
	    this.nodes['oscillatorNode'].connect(this.nodes['gainNode']);
	    this.nodes['gainNode'].connect((<any>this.nodes['delayNode']).delayTime);
	    this.nodes['inputGainNode'].connect(this.nodes['wetGainNode']);
	    this.nodes['inputGainNode'].connect(this.nodes['delayNode']);
	    this.nodes['delayNode'].connect(this.nodes['wetGainNode']);
	    this.nodes['delayNode'].connect(this.nodes['feedbackGainNode']);
	    this.nodes['feedbackGainNode'].connect(this.nodes['inputGainNode']);

        // Setup the oscillator
        (<OscillatorNode>this.nodes['oscillatorNode']).type = 'sine';
        (<OscillatorNode>this.nodes['oscillatorNode']).start(0);

        // Set the input gain-node as the input-node.
        this.node = this.nodes['inputGainNode'];

        // Set the output gain-node as the output-node.
        this.output = this.nodes['wetGainNode'];

        // Set the default delay of 0.005 seconds
        this.delay = 0.005;

        // Set the default depth to 0.002;
        this.depth = 0.002;

        // Set the default feedback to 0.5
        this.feedback = 0.5;

        // Set the default speed to 0.25Hz
        this.speed = 0.25;
    }

    /**
     * Getter for the effect's delay
     * @return {number}
     */
    public get delay() : number|string{
        return this._delay;
    }

    /**
     * Setter for the effect's delay
     * @param  {number} delay
     */
    public set delay(delay: number|string) {
        // Set the internal delay value
        this._delay = parseFloat(<string>delay);

        // Set the new value for the delay-node
        (<DelayNode>this.nodes['delayNode']).delayTime.value = this._delay;
    }

    /**
     * Getter for the effect's depth
     * @return {number}
     */
    public get depth() : number|string {
        return this._depth;
    }

    /**
     * Setter for the effect's depth
     * @param  {number} depth
     */
    public set depth(depth: number|string) {
        // Set the internal depth value
        this._depth = parseFloat(<string>depth);

        // Set the gain value of the gain-node
        (<GainNode>this.nodes['gainNode']).gain.value = this._depth;
    }

    /**
     * Getter for the effect's feedback
     * @return {number}
     */
    public get feedback() : number|string {
        return this._feedback;
    }

    /**
     * Setter for the effect's feedback
     * @param  {number} feedback
     */
    public set feedback(feedback: number|string) {
        // Set the internal feedback value
        this._feedback = parseFloat(<string>feedback);

        // Set the feedback gain-node value
        (<GainNode>this.nodes['feedbackGainNode']).gain.value = this._feedback;
    }

    /**
     * Getter for the effect's speed
     * @return {number}
     */
    public get speed() : number|string {
        return this._speed;
    }

    /**
     * Setter for the effect's speed
     * @param  {number} speed
     */
    public set speed(speed: number|string) {
        // Set the internal speed value
        this._speed = parseFloat(<string>speed);

        // Set the speed gain-node value
        (<OscillatorNode>this.nodes['oscillatorNode']).frequency.value = this._speed;
    }
};
