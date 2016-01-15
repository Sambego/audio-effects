# pedalboard.js
A javascript library to create guitar effects using the web-audio-api.

## This is still a work in progress!
Check back later or start watching this repository.

# API
## Pedalboard
**This is a provisional and can change at any time.**

To start create a new Pedalboard instance, this is the foundation.

```javascript
const pedalboard = new Pedalboard();
```

## Input
An input node manages the audio input.
You can either supply an audio stream.

```javascript
const stream = // Some audio stream
      input = pedalboard.input();
      input.input = stream;

```

Or use the `getUserMedia` method to access the devices microphone.

```javascript
const input = pedalboard.input();
      input.getUserMedia();

```

## Output
This is the audio node which should be at the and of the chain, this connects our audio to the devices spearkers.

```javascript
const output = pedalboard.output();
```

## Volume
Controll the volume of your audio or mute it.

```javascript
const volume = pedalboard.volume();
      volume.level = 0.5; // Change the volume to 50%
      volume.mute = true; // Mute the volume
```

## Distortion
Add a distortion effect>

```javascript
const distortion = pedalboard.distortion();
      distorion.intensity = 200; // Set the intensity to 200
      distorion.gain = 100; // Set the gain to 100
      distorion.lowPassFilter = true; // Enable the lowpass filter
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