import {SingleAudioNode} from '../SingleAudioNode';

/**
 * The audio-effects volume class.
 * This class lets you change the volume of the audio signal.
 */
export class Volume extends SingleAudioNode{
    private _level: number;
    private _levelBeforeMute: number;
    private _mute: boolean;

    constructor(audioContext: AudioContext) {
        super(audioContext);

        // Create the gain-node which we'll use to change the volume.
        this.node = this.audioContext.createGain();

        // The initial volume level is 100%.
        this.level = 1;

        // The effect is not muted by default.
        this.mute = false;
    }

    /**
     * Getter for the effects volume.
     * @return {Float}
     */
    public get level() : number|string {
        return this._level;
    }

    /**
     * Setter for the effects volume.
     * @param  {Float} volume The volume, tipical between 0 and 1.
     */
    public set level(volume: number|string) {
        // Parse the volume, it can not be lower than 0.
        let vol:number = parseFloat(<string>volume);
            vol = (vol >= 0 ? vol : 0);

        // Set the internal volume value.
        this._level = vol;

        // Set the gainNode's gain value.
        (<GainNode>this.node).gain.value = vol;

        // Set the internal mute value.
        this._mute = (vol === 0);
    }

    /**
     * Getter for the effcts mute functionality.
     * @return {[type]} [description]
     */
    public get mute() : boolean {
        return this._mute;
    }

    /**
     * Setter for the effects mute functionality.
     * @param  {Boolean} mute Whether the effect is muted.
     */
    public set mute(mute: boolean) {
        // Set the internal mute value.
        this._mute = !!mute;


        if (this._mute) {
            // Keep track of the volume before muting
            this._levelBeforeMute = <number>this.level;

            // Set the volume to 0
            this.level = 0;
        } else {
            // Set the volume to the previous volume.
            this.level = this._levelBeforeMute || this._level;
        }
    }
};
