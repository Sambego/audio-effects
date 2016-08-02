/**
 * Export all effects:
 * - Input
 * - Output
 * - Volume
 * - Distortion
 * - Delay
 * - Flanger
 * - Reverb
 * - Tremolo
 */
export {Input as Input} from './audio-nodes/effects/Input';
export {Output as Output} from './audio-nodes/effects/Output';
export {Volume as Volume} from './audio-nodes/effects/Volume';
export {Distortion as Distortion} from './audio-nodes/effects/Distortion';
export {Delay as Delay} from './audio-nodes/effects/Delay';
export {Flanger as Flanger} from './audio-nodes/effects/Flanger';
export {Reverb as Reverb} from './audio-nodes/effects/Reverb';
export {Tremolo as Tremolo} from './audio-nodes/effects/Tremolo';

/**
 * Export the base audioNodes:
 * - SingleAudioNode
 * - MultiAudioNode
 */

export {SingleAudioNode as SingleAudioNode} from './audio-nodes/SingleAudioNode';
export {MultiAudioNode as MultiAudioNode} from './audio-nodes/MultiAudioNode';

/**
 * Export helper-functions:
 *  - HasAudioContext: Check if the current browser supports the web-audio-api.
 *  - HasGetUserMedia: Check if the current browser supports getUserMedia.
 */
export {HasAudioContext as HasAudioContext} from './helpers/HasAudioContext';
export {HasGetUserMedia as HasGetUserMedia} from './helpers/HasGetUserMedia';
