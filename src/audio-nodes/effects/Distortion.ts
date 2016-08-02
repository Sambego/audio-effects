import {MultiAudioNode} from '../MultiAudioNode';

/**
 * The audio-effects distortion class.
 * This class lets you add a distortion effect.
 */
export class Distortion extends MultiAudioNode {
    private _intensity: number;
    private _gain: number;
    private _lowPassFilter: boolean;

    constructor(audioContext: AudioContext) {
        super(audioContext);

        this.nodes = {
            waveshaper: this.audioContext.createWaveShaper(), // Create the waveshaper-node we'll use to create the distortion effect.
            gainNode: this.audioContext.createGain(), // Create the gain-nodes we use to increase the gain.
            gainNode2: this.audioContext.createGain(),
            biquadFilterNode: this.audioContext.createBiquadFilter() // Create the biquad-filter-node we'll use to create a lowpass filter.
        };

        // Set the oversample value to 4x by default.
        (<WaveShaperNode>this.nodes['waveshaper']).oversample = '4x';

        // Set the type of to lowpass by default.
        (<BiquadFilterNode>this.nodes['biquadFilterNode']).type = 'lowpass';

        // Set the frequency value to 2000 by default.
        (<BiquadFilterNode>this.nodes['biquadFilterNode']).frequency.value = 2000;

        // Connect all nodes together
        this.nodes['waveshaper'].connect(this.nodes['gainNode']);
        this.nodes['gainNode'].connect(this.nodes['gainNode2']);
        this.nodes['gainNode2'].connect(this.nodes['biquadFilterNode']);

        // Set the waveshaper-node as the input-node.
        this.node = this.nodes['waveshaper'];
        // Set the biquad-filter-node as the output-node.
        this.output = this.nodes['biquadFilterNode'];

        // The default intensity is 100.
        this.intensity = 100;

        // The default gain is 1.
        this.gain = 50;

        // // The lowpass filter is turned off by default.
        this.lowPassFilter = false;
    }

    /**
     * Calculate a distortion curve.
     *
     * http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
     *
     * @param  {number} intens The intensity of the curve modification.
     * @return {Float32Array}
     */
     private calculateDistortionCurve(intens: number|string) : Float32Array {
        const intensity:number = parseInt(<string>intens) || 100;
        const amount: number = 44100;
        const deg:number  = Math.PI / 180;
        const curve:Float32Array = new Float32Array(amount);
        let i:number = 0;
        let x: number;

        for (; i < amount; ++i ) {
            x = i * 2 / amount - 1;
            curve[i] = ( 3 + intensity ) * x * 20 * deg / ( Math.PI + intensity * Math.abs(x) );
        }

        return curve;
    };

    /**
     * Getter for the effect's intensity.
     * @return {number}
     */
    public get intensity() : number|string {
        return this._intensity;
    }

    /**
     * Setter for the effect's intensity.
     */
    public set intensity(intensity: number|string) {
        // Set the internal intensity value.
        this._intensity = parseInt(<string>intensity);

        // Set the new curve of the waveshaper-node
        (<WaveShaperNode>this.nodes['waveshaper']).curve = this.calculateDistortionCurve(this._intensity);
    }

    /**
     * Getter for the effect's gain.
     * @return {number}
     */
    public get gain() : number|string {
        return this._gain;
    }

    /**
     * Setter for the effect's gain.
     * @param  {number} gain
     */
    public set gain(gain: number|string) {
        // Set the internal gain value.
        this._gain = parseFloat(<string>gain);

        // Set the gain-node's gain value.
        (<GainNode>this.nodes['gainNode']).gain.value = this._gain;
        (<GainNode>this.nodes['gainNode2']).gain.value = 1 / this._gain;
    }

    /**
     * Getter for the lowpass filter.
     * @return {boolean}
     */
    public get lowPassFilter() : boolean{
        return this._lowPassFilter;
    }

    /**
     * Setter for the lowpass filter.
     * @param {boolean} lowPassFilter
     */
    public set lowPassFilter(lowPassFilter: boolean) {
        // Set the internal lowpass filter value.
        this._lowPassFilter = !!lowPassFilter;
        // Set the biquad-filter-node's frequency.
        (<BiquadFilterNode>this.nodes['biquadFilterNode']).frequency.value = (this._lowPassFilter ? 2000 : 1000)
    }
};
