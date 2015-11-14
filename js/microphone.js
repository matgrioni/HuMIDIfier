/********************************************************************
* Author: Matias Grioni
* Date Created: 14 November 2015
*
* The Microphone object that handles the requesting of permissions
* and handling stream sources and what not.
********************************************************************/

var Microphone = function(fftSize) {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = fftSize;
    
    this.allowed = false;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.data = new Uint8Array(this.bufferLength);
};

Microphone.prototype.request = function() {
    var that = this;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
                audio: true,
            },

            function(stream) {
                that.stream = stream;
                that.source = that.audioCtx.createMediaStreamSource(stream);
                that.source.connect(that.analyser);

                that.allowed = true;
            },

            function(err) {
                console.log("There was an error getting the microphone");
            }
        );
    }
};

Microphone.prototype.getData = function() {
    this.analyser.getByteFrequencyData(this.data);
    return this.data;
};
