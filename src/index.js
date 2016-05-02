import HasAudioContext from './Helpers/HasAudioContext';
import Effects from './audioNodes/Effects';

/**
 * Generate all methods to create a pedalboard audio node.
 * These are the methods which will be generated:
 * - createInput()
 * - createOutput()
 * - createVolume()
 * - createDistortion()
 * - createDelay()
 * - createFlanger()
 * - createReverb()
 *
 * @param  {Class}        pedalboard   The pedalboard class to create the methods on.
 * @param  {AudioContext} audioContext The audio-context which will be used by the method.
 */
const generatePedalboardAudioMethods = function(pedalboard, audioContext) {
    // Loop over all effects.
    for (let effect in Effects) {
        // Create a method to create the effect in the pedalboard class.
        pedalboard[`create${effect}`] = (...params) => {
            return new Effects[effect](audioContext, ...params);
        };
    }
};

/**
 * The main pedalboard class.
 * This class contains methods to create pedalboard effects.
 */
export default class Pedalboard {
    constructor(config) {
        // If the browser doesn't support the web-audio-api, throw an error.
        if (!HasAudioContext) {
            throw new Error('Your browser can not create an audioContext, please upgrade or use another browser!')
        }

        // Create the audio-context the pedalboard is going to use.
        this.audioContext = new AudioContext();

        // Generate all effect-creation methods.
        generatePedalboardAudioMethods(this, this.audioContext);
    }
};

// Put the class on the window for temporary testing purposes
!function() {
    window.Pedalboard = Pedalboard;
}();
