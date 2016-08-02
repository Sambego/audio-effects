/**
 * Check if the current browser supports getUserMedia.
 */
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;

export const HasGetUserMedia: boolean = !!navigator.getUserMedia;
