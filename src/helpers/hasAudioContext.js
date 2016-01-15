window.AudioContext = window.AudioContext ||
                      window.webkitAudioContext ||
                      window.mozAudioContext ||
                      window.msAudioContext;

export const hasAudioContext = !!window.AudioContext;
