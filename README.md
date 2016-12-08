# Audio-effects

A javascript library to create audio effects using the web-audio-api. This library contains the following effects:
- Volume
- Distortion
- Delay
- Flanger
- Reverb
- Tremolo

I will try to add more effects in the future.

# Install
```
npm install --save audio-effects
```

# API

## Audio context
To start, we need an audio-context, the audio-effect library has a useful helper function to check if the current browser supports the web-audio-api.

```javascript
import {HasAudioContext} from 'audio-effects';

let audioContext = null;

if (HasAudioContext) {
    audioContext = new AudioContext();
}
```

## Input
An input node manages the audio input.
You can either supply an audio stream.

```javascript
import {Input} from 'audio-effects';

const stream = createAnAudioStream(); // Some audio stream
const input = new Input(audioContext);
      input.input = stream;
```

Or use the `getUserMedia` method to access the devices microphone.

```javascript
import {Input} from 'audio-effects';

const input = new Input(audioContext);
      input.getUserMedia();
```

## Output
This is the audio node which should be at the end of the chain, this connects our audio to the device's speakers.

```javascript
import {Output} from 'audio-effects';

const output = new Output(audioContext);
```

## Volume
Control the volume of your audio or mute it.

```javascript
import {Volume} from 'audio-effects';

const volume = new Volume(audioContext);
      volume.level = 0.5; // Change the volume to 50%
      volume.mute = true; // Mute the volume
```

## Distortion
Add a distortion effect

```javascript
import {Distortion} from 'audio-effects';

const distortion = new Distortion(audioContext);
      distortion.intensity = 200; // Set the intensity to 200
      distortion.gain = 100; // Set the gain to 100
      distortion.lowPassFilter = true; // Enable the lowpass filter
```

## Delay
Add a delay effect

```javascript
import {Delay} from 'audio-effects';

const delay = new Delay(audioContext);
      delay.wet = 1; // Set the wetness to 100%
      delay.speed = 1; // Set the speed to 1 second
      delay.duration = 0.4; // Set the delay duration to 40%
```

## Flanger
Add a Flanger effect

```javascript
import {Flanger} from 'audio-effects';

const flanger = new Flanger(audioContext);
      flanger.delay = 0.005; // Set the delay to 0.005 seconds
      flanger.depth = 0.002; // Set the depth to 0.002
      flanger.feedback = 0.5; // Set the feedback to 50%
      flanger.speed = 0.25; // Set the speed to 0.25 Hz
```

## Reverb
Add a Reverb effect

```javascript
import {Reverb} from 'audio-effects';

const reverb = new Reverb(audioContext)
      reverb.wet = 0.5; // Set the wetness to 50%
      reverb.level = 1; // Set the level to 100%
      ReverbNode.getInputResponseFile('path/to/input-response-file').then(buffer => {
        reverb.buffer = buffer;
      });
```

## Tremolo
Add a Tremolo effect

```javascript
import {Tremolo} from 'audio-effects';

const tremolo = new Tremolo(audioContext);
      tremolo.speed = 1; // Set the speed to 1Hz
```

## Chaining
Like regular audio nodes, these nodes need to be chained together to connect the input to effects and the output.
The api is the same as with normal audio nodes.

```javascript
input.connect(output);
```

Unlike their native counterparts, audio-effects' audio nodes can also be chained together.

```javascript
input.connect(volume).connect(distortion).connect(output);
```
## Helper functions
The audio-effects library has some built-in helper functions.

```javascript
import {HasAudioContext, HasGetUserMedia} from 'audio-effects';

if (HasAudioContext) {
    // The current browser supports the web-audio-api.
}

if (HasGetUserMedia) {
    // The current browser supports getUserMedia.
}
```
## Create your own effects
It is possible to create your own effects.

```javascript
import {SingleAudioNode} from 'audio-effects';

class CustomEffect extends SingleAudioNode {
    constructor(audioContext) {
        super(audioContext);

        // All audio nodes needed for the effect should be kept in the nodes object.
        this.nodes = {
            node1: audioContext.createGain(),
            node2: audioContext.createGain(),
            node3: audioContext.createGain(),
        };

        // Connect all nodes
        // [node 1]-->>--[node 2]-->>--[node 3]
        this.nodes.node1.connect(this.nodes.node2);
        this.nodes.node2.connect(this.nodes.node3);

        // Set the  input-node, this is the first node in the effect's chain.
        this._node = this.nodes.node1;

        // Set the output-node, this is the last node in the effect's chain.
        this._outputNode = this.nodes.node3;
    }

    // Create getters and setters for the parameters you want to be customizable.
    get gain() {
        return this.nodes.node1.gain.value;
    }

    set gain(gain) {
        this.nodes.node1.gain.value = parseFloat(gain);
    }

    ...
}
```

# Todo
- [ ] Write tests!
- [ ] Add tuner
- [ ] Add chorus
- [ ] Add auto-wah
- [ ] ...

# License

## The MIT License (MIT)

Copyright © `2016` `Sam Bellen`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
