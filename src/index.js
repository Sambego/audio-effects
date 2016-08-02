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
 * - Pitchshifter
 */
import Input from './audio-nodes/effects/Input';
import Output from './audio-nodes/effects/Output';
import Volume from './audio-nodes/effects/Volume';
import Distortion from './audio-nodes/effects/Distortion';
import Delay from './audio-nodes/effects/Delay';
import Flanger from './audio-nodes/effects/Flanger';
import Reverb from './audio-nodes/effects/Reverb';
import Tremolo from './audio-nodes/effects/Tremolo';

export {Input as Input};
export {Output as Output};
export {Volume as Volume};
export {Distortion as Distortion};
export {Delay as Delay};
export {Flanger as Flanger};
export {Reverb as Reverb};
export {Tremolo as Tremolo};

/**
 * Export the base audioNodes:
 * - SingleAudioNode
 * - MultiAudioNode
 */

import SingleAudioNode from './audio-nodes/SingleAudioNode';
import MultiAudioNode from './audio-nodes/MultiAudioNode';

export {SingleAudioNode as SingleAudioNode};
export {MultiAudioNode as MultiAudioNode};

/**
 * Export helper-functions:
 *  - HasAudioContext: Check if the current browser supports the web-audio-api.
 *  - HasGetUserMedia: Check if the current browser supports getUserMedia.
 */
import HasAudioContext from './helpers/HasAudioContext';
import HasGetUserMedia from './helpers/HasGetUserMedia';

export {HasAudioContext as HasAudioContext};
export {HasGetUserMedia as HasGetUserMedia};
