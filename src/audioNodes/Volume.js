import SingleAudioNode from './SingleAudioNode';

export default class Volume extends SingleAudioNode{
    constructor(audioContext) {
        super(audioContext);

        this._level = 1;
        this._mute = false;

        this._node = this._audioContext.createGain();
        this._node.gain.value = this._level;
    }

    set level(volume) {
        let vol = parseFloat(volume);
            vol = (vol >= 0 ? vol : 0);

        this._level = vol;
        this._mute = (vol === 0);
        this._node.gain.value = vol;

        return this._level;
    }

    get level() {
        return this._level;
    }

    set mute(mute) {
        this._mute = !!mute;
        this._node.gain.value = this._mute ? 0 : this._level;

        return this._mute;
    }

    get mute() {
        return this._mute;
    }
};