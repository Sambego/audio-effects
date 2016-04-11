/**
 * Check if the current browser supports getUserMedia.
 */
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;

const HasGetUserMedia = !!navigator.getUserMedia;
export default HasGetUserMedia;
