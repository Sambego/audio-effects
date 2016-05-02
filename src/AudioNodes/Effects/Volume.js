import SingleAudioNode from '../SingleAudioNode';

/**
 * The pedalboard volume class.
 * This class lets you change the volume of the audio signal.
 */
export default class Volume extends SingleAudioNode{
    constructor(audioContext) {
        super(audioContext);

        // Create the gain-node which we'll use to change the volume.
        this.node = this._audioContext.createGain();

        // The initial volume level is 100%.
        this.level = 1;

        // The effect is not muted by default.
        this.mute = false;
    }

    /**
     * Setter for the effects volume.
     * @param  {Float} volume The volume, tipical between 0 and 1.
     * @return {Float}
     */
    set level(volume) {
        // Parse the volume, it can not be lower than 0.
        let vol = parseFloat(volume);
            vol = (vol >= 0 ? vol : 0);

        // Set the internal volume value.
        this._level = vol;

        // Set the gainNode's gain value.
        this._node.gain.value = vol;

        // Set the internal mute value.
        this._mute = (vol === 0);

        return this._level;
    }

    /**
     * Getter for the effects volume.
     * @return {Float}
     */
    get level() {
        return this._level;
    }

    /**
     * Setter for the effects mute functionality.
     * @param  {Boolean} mute Whether the effect is muted.
     * @return {Boolean}
     */
    set mute(mute) {
        // Set the internal mute value.
        this._mute = !!mute;


        if (this._mute) {
            // Keep track of the volume before muting
            this._levelBeforeMute = this.level;

            // Set the volume to 0
            this.level = 0;
        } else {
            // Set the volume to the previous volume.
            this.level = this._levelBeforeMute || 1;
        }

        return this._mute;
    }

    /**
     * Getter for the effcts mute functionality.
     * @return {[type]} [description]
     */
    get mute() {
        return this._mute;
    }
};
