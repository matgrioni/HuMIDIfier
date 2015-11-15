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

    this.nodes = [this.analyser];
    
    this.allowed = false;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.data = new Uint8Array(this.bufferLength);
};

Microphone.prototype.request = function(success, error) {
    var that = this;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
                audio: true,
            },

            function(stream) {
                that.allowed = true;

                that.stream = stream;
                that.source = that.audioCtx.createMediaStreamSource(stream);
                that.source.connect(that.analyser);

                if(success)
                    success();
            },

            function(err) {
                console.log("There was an error getting the microphone");

                if(error)
                    error();
            }
        );
    }
};

Microphone.prototype.getData = function() {
    this.analyser.getByteTimeDomainData(this.data);
    return this.data;
};

Microphone.prototype.getSampleRate = function() {
    return this.audioCtx.sampleRate;
}
