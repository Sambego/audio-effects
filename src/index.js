/**
 * Export all effects:
 * - Input
 * - Output
 * - Volume
 * - Distortion
 * - Delay
 * - Flanger
 * - Reverb
 */
import Input from './AudioNodes/Effects/Input';
import Output from './AudioNodes/Effects/Output';
import Volume from './AudioNodes/Effects/Volume';
import Distortion from './AudioNodes/Effects/Distortion';
import Delay from './AudioNodes/Effects/Delay';
import Flanger from './AudioNodes/Effects/Flanger';
import Reverb from './AudioNodes/Effects/Reverb';

export {Input as Input};
export {Output as Output};
export {Volume as Volume};
export {Distortion as Distortion};
export {Delay as Delay};
export {Flanger as Flanger};
export {Reverb as Reverb};

/**
 * Export the base audioNodes:
 * - SingleAudioNode
 * - MultiAudioNode
 */

import SingleAudioNode from './AudioNodes/SingleAudioNode';
import MultiAudioNode from './AudioNodes/MultiAudioNode';

export {SingleAudioNode as SingleAudioNode};
export {MultiAudioNode as MultiAudioNode};

/**
 * Export helper-functions:
 *  - HasAudioContext: Check if the current browser supports the web-audio-api.
 *  - HasGetUserMedia: Check if the current browser supports getUserMedia.
 */
import HasAudioContext from './Helpers/HasAudioContext';
import HasGetUserMedia from './Helpers/HasGetUserMedia';

export {HasAudioContext as HasAudioContext};
export {HasGetUserMedia as HasGetUserMedia};
