/**
 * Add Audiocontext and it's browser-prefixed version to the window interFace.
 */
interface Window {
    AudioContext: any;
    webkitAudioContext: any;
    mozAudioContext: any;
    msAudioContext: any;
}

/**
 * Check if the current browser supports the web-audio-api .
 */
const win: Window = <any>window;

win.AudioContext = win.AudioContext ||
                      win.webkitAudioContext ||
                      win.mozAudioContext ||
                      win.msAudioContext;

export const HasAudioContext: boolean = !!win.AudioContext;
