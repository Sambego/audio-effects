# pedalboard.js

A javascript library to create guitar effects using the web-audio-api. This library contains the following effect:
- Volume
- Distortion
- Delay
- Flanger
- Reverb

I will try to add more effect in the future.

# API

## Pedalboard
To start create a new Pedalboard instance, this is the foundation.

```javascript
const pedalboard = new Pedalboard();
```

## Input
An input node manages the audio input.
You can either supply an audio stream.

```javascript
const stream = // Some audio stream
      input = pedalboard.createInput();
      input.input = stream;

```

Or use the `getUserMedia` method to access the devices microphone.

```javascript
const input = pedalboard.createInput();
      input.getUserMedia();

```

## Output
This is the audio node which should be at the and of the chain, this connects our audio to the devices speakers.

```javascript
const output = pedalboard.createOutput();
```

## Volume
Control the volume of your audio or mute it.

```javascript
const volume = pedalboard.createVolume();
      volume.level = 0.5; // Change the volume to 50%
      volume.mute = true; // Mute the volume
```

## Distortion
Add a distortion effect

```javascript
const distortion = pedalboard.createDistortion();
      distortion.intensity = 200; // Set the intensity to 200
      distortion.gain = 100; // Set the gain to 100
      distortion.lowPassFilter = true; // Enable the lowpass filter
```

## Delay
Add a delay effect

```javascript
const delay = pedalboard.createDelay();
      delay.wet = 1; // Set the wetness to 100%
      delay.speed = 1; // Set the speed to 1 second
      delay.duration = 0.4; // Set the delay duration to 40%
```

## Flanger
Add a Flanger effect

```javascript
const flanger = pedalboard.createFlanger();
      flanger.delay = 0.005; // Set the delay to 0.005 seconds
      flanger.depth = 0.002; // Set the depth to 0.002
      flanger.feedback = 0.5; // Set the feedback to 50%
      flanger.speed = 0.25; // Set the speed to 0.25 Hz
```

## Reverb
Add a Reverb effect

```javascript
const reverb = pedalboard.createReverb()
      reverb.wet = 0.5; // Set the wetness to 50%
      reverb.level = 1; // Set the level to 100%
```

By default the reverb effect will use the hall-reverb input response file from the awesome (web-audio-playground)[https://github.com/cwilso/WebAudio] by Chris Wilson.

if you want to use your own input response file you can configure it in 2 ways:

```javascript
const irf = fetch('path/to/input-response-file', {
          method: 'get'
      }).then(response => {
          return response.arrayBuffer();
      });

      // Option 1: pass it as a parameter when creating the reverb effect
      irf.then(buffer => {
         const reverb = pedalboard.createReverb(buffer);
      });

      // Option 2: set the buffer after creating the reverb effect
      const reverb = pedalboard.createReverb();

      irf.then(buffer => {
         reverb.buffer = buffer;
      });
```

## Chaining
Like regular audio nodes, these nodes need to be chained together to connect the input to effects and the output.
The api is the same as with normal audio nodes.

```javascript
input.connect(output);
```

Unlike their native counterparts, pedalboard audio nodes can also be chained together.

```javascript
input.connect(volume).connect(distortion).connect(output);
```

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
