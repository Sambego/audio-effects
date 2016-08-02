// import SingleAudioNode from '../SingleAudioNode';
//
// /**
//  * The audio-effects pitchshifter class.
//  * This class lets you add a pitchshifter effect.
//  */
// export default class Pitchshifter extends SingleAudioNode {
//     constructor(audioContext, inputChannels = 1, outputChannels = 1) {
//         super(audioContext);
//
//         this.nodes = {
//             scriptNode: audioContext.createScriptProcessor(0, inputChannels, outputChannels), // Create the scriptNode
//         };
//
//         // Set the script-node as the main node.
//         this.node = this.nodes.scriptNode;
//
//         // Start the script processor
//         this.processAudioData();
//
//         // // Set the default speed to 20Hz
//         // this.speed = 20;
//     }
//
//     processAudioData = function processAudioData() {
//         // Give the node a function to process audio events
//         this.nodes.scriptNode.onaudioprocess = event => {
//             const inputBuffer = event.inputBuffer;
//             const outputBuffer = event.outputBuffer;
//
//             let i = 0;
//
//             for (; i < outputBuffer.numberOfChannels; i++) {
//                 const inputData = inputBuffer.getChannelData(i);
//                 const outputData = outputBuffer.getChannelData(i);
//
//                 let i = 0;
//
//                 for (; i < inputBuffer.length; i++) {
//                     outputData[i] = inputData[i];
//
//                     // Shift the pitch
//                     outputData[i] += 20;
//                 }
//             }
//         }
//     }
//
//     // /**
//     //  * Getter for the effect's speed
//     //  * @return {Float}
//     //  */
//     // get speed() {
//     //     return this._speed;
//     // }
//     //
//     // /**
//     //  * Setter for the effect's speed
//     //  * @param  {Float} speed
//     //  * @return {Float}
//     //  */
//     // set speed(speed) {
//     //     // Set the internal speed value
//     //     this._speed = parseFloat(speed);
//     //
//     //     // Set the new value for the oscillator frequency
//     //     this.nodes.oscillatorNode.frequency.value = this._speed;
//     //
//     //     return this._speed;
//     // }
// };
