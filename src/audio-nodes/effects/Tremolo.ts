import {SingleAudioNode} from '../SingleAudioNode';

/**
 * The audio-effects tremolo class.
 * This class lets you add a tremolo effect.
 */
export class Tremolo extends SingleAudioNode {
    private _speed: number;

    constructor(audioContext: AudioContext) {
        super(audioContext);

        this.nodes = {
            gainNode: audioContext.createGain(), // Create the gain-node
        	oscillatorNode: audioContext.createOscillator() // Create the oscilator node
        };

        // Wire it all up
	    this.nodes['oscillatorNode'].connect((<any>this.nodes['gainNode']).gain);

        // Setup the oscillator
        (<OscillatorNode>this.nodes['oscillatorNode']).type = 'sine';
        (<OscillatorNode>this.nodes['oscillatorNode']).start(0);

        // Set the gain-node as the main node.
        this.node = this.nodes['gainNode'];

        // Set the default speed to 20Hz
        this.speed = 20;
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

        // Set the new value for the oscillator frequency
        (<OscillatorNode>this.nodes['oscillatorNode']).frequency.value = this._speed;
    }
};
