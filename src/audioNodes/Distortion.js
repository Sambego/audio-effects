import MultiAudioNode from './MultiAudioNode';

let _waveshaperNode, _gainNode, _biquadFilterNode;

const _calculateDistortionCurve = function(intens) {
    const intensity = i || 150,
        amount = 44100,
        deg = Math.PI / 180;

    let curve = new Float32Array(amount),
        i = 0,
        x;

    for (; i < amount; ++i ) {
        x = i * 2 / amount - 1;
        curve[i] = ( 3 + intensity ) * x * 20 * deg / ( Math.PI + intensity * Math.abs(x) );
    }

    return curve;
};

export default class Distortion extends MultiAudioNode {
    constructor(audioContext) {
        super(audioContext);

        this._intensity = 150;
        this._gain = 120;
        this._lowPassFilter = false;

        _waveshaperNode = this._audioContext.createWaveShaper();
        _waveshaperNode.oversample = '4x'

        _gainNode = this._audioContext.createGain();

        _biquadFilterNode = this._audioContext.createBiquadFilter();
        _biquadFilterNode.type = 'lowpass';
        _biquadFilterNode.frequency.value = 2000;

        _waveshaperNode.connect(_gainNode);
        _gainNode.connect(_biquadFilterNode);

        this._node = _waveshaperNode;
        this._outputNode = _biquadFilterNode;
    }

    get intensity() {
        return this._intensity;
    }

    set intensity(intensity) {
        this._intensity = parseInt(intensity)
        this._waveshaperNode.curve = _calculateDistortionCurve(this._intensity);

        return this._intensity;
    }

    get gain() {
        return this._gain;
    }

    set gain(gain) {
        this._gain = parseFloat(gain);
        this._gainNode.gain.value = this._gain;

        return this._gain;
    }

    get lowPassFilter() {
        return this._lowPassFilter;
    }

    set lowPassFilter(lowPassFilter) {
        this._lowPassFilter = !!lowPassFilter;
        this._biquadFilterNode.frequency.value = (_this.lowPassFilter ? 2000 : 1000)

        return this._lowPassFilter;
    }
};
