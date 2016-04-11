/**
 * Check if the current browser supports the web-audio-api .
 */
window.AudioContext = window.AudioContext ||
                      window.webkitAudioContext ||
                      window.mozAudioContext ||
                      window.msAudioContext;

const HasAudioContext = !!window.AudioContext;
export default HasAudioContext;
