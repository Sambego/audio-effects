import MultiAudioNode from '../MultiAudioNode';

// "Private" varibles
let _waveshaperNode, _gainNode, _biquadFilterNode;

/**
 * Calculate a distortion curve.
 *
 * http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
 *
 * @param  {Int} intens The intensity of the curve modification.
 * @return {Float32Array}
 */
const _calculateDistortionCurve = function(intens) {
    const intensity = parseInt(intens) || 100,
        amount = 44100,
        deg = Math.PI / 180,
        curve = new Float32Array(amount);
    let i = 0,
        x;

    for (; i < amount; ++i ) {
        x = i * 2 / amount - 1;
        curve[i] = ( 3 + intensity ) * x * 20 * deg / ( Math.PI + intensity * Math.abs(x) );
    }

    return curve;
};

/**
 * The pedalboard volume class.
 * This class lets you add a distortion effect.
 */
export default class Distortion extends MultiAudioNode {
    constructor(audioContext) {
        super(audioContext);

        // Create the waveshaper-node we'll use to create the distortion effect.
        _waveshaperNode = this._audioContext.createWaveShaper();
        // Set the oversample value to 4x by default.
        _waveshaperNode.oversample = '4x'

        // Create the gain-node we use to increase the gain.
        _gainNode = this._audioContext.createGain();

        // Create the biquad-filter-node we'll use to create a lowpass filter.
        _biquadFilterNode = this._audioContext.createBiquadFilter();
        // Set the type of to lowpass by default.
        _biquadFilterNode.type = 'lowpass';
        // Set the frequency value to 2000 by default.
        _biquadFilterNode.frequency.value = 2000;

        // Connect all nodes together
        _waveshaperNode.connect(_gainNode);
        _gainNode.connect(_biquadFilterNode);

        // Set the waveshaper-node as the input-node.
        this._node = _waveshaperNode;
        // Set the biquad-filter-node as the output-node.
        this._outputNode = _biquadFilterNode;

        // The default intensity is 100.
        this.intensity = 100;
        // The default gain is 1.
        this.gain = 1;
        // // The lowpass filter is turned off by default.
        this.lowPassFilter = false;
    }

    /**
     * Getter for the effect's intensity.
     * @return {Int}
     */
    get intensity() {
        return this._intensity;
    }

    /**
     * Setter for the effect's intensity.
     * @param  {Int} intensity
     * @return {Int}
     */
    set intensity(intensity) {
        // Set the internal intensity value.
        this._intensity = parseInt(intensity)
        // Set the new curve of the waveshaper-node
        _waveshaperNode.curve = _calculateDistortionCurve(this._intensity);

        return this._intensity;
    }

    /**
     * Getter for the effect's gain.
     * @return {Float}
     */
    get gain() {
        return this._gain;
    }

    /**
     * Setter for the effect's gain.
     * @param  {Float} gain
     * @return {Float}
     */
    set gain(gain) {
        // Set the internal gain value.
        this._gain = parseFloat(gain);
        // Set the gain-node's gain value.
        _gainNode.gain.value = this._gain;

        return this._gain;
    }

    /**
     * Getter for the lowpass filter.
     * @return {Boolean}
     */
    get lowPassFilter() {
        return this._lowPassFilter;
    }

    /**
     * Setter for the lowpass filter.
     * @param  {Boolean} lowPassFilter
     * @return {Boolean}
     */
    set lowPassFilter(lowPassFilter) {
        // Set the internal lowpass filter value.
        this._lowPassFilter = !!lowPassFilter;
        // Set the biquad-filter-node's frequency.
        _biquadFilterNode.frequency.value = (this._lowPassFilter ? 2000 : 1000)

        return this._lowPassFilter;
    }
};
