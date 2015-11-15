/********************************************************************
* Author: Matias Grioni
* Created: 14 November 15
*
* Class that represents a sample from the FFT. It will do
* calculations on the provided array. The input is assumed to be an
* array in the time domain of the amplitude of the waveform from the
* input source.
********************************************************************/

var Sample = function(sampleRate, notes) {
    this.sampleRate = sampleRate;
    this.notes = notes;
};

Sample.prototype.pitch = function(data) {
    var result = -1;

    var bestCorrelation = 0;
    var bestOffset = -1;
    var last = 1;
    var goodCorrelationFound = false;
    var correlations = [];

    var offset = 0;
    var done = false;
    while(offset < data.length && !done) {
        var diff = 0;
        for(var i = 0; i < data.length - offset; i++) {
            diff += Math.abs((data[i] - data[i + offset]) * 1.0 / 256);
        }

        var correlation = 1 - (diff / data.length);
        correlations[offset] = correlation;

        // The correlation is getting closer to a desired value. When first
        // starting the correlation will be very high since the values are so
        // close. But once the values drop and then get high again are good
        // we know we found the right match.
        if((correlation > 0.9) && (correlation > last)) {
            goodCorrelationFound = true;

            if(correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }
        } else if(goodCorrelationFound) {
            // Now this means we found a good offset amount, but are going back
            // to bad offset amounts. Now average the correlations around the
            // best offset.
            var correlationNormDiff = (correlations[bestOffset + 1] - correlations[bestOffset - 1]) / correlations[bestOffset];
            result = this.sampleRate / (bestOffset + (8 * correlationNormDiff));
            done = true;
        }

        last = correlation;
        offset++;
    }

    return result;
};

Sample.prototype.note = function(data) {
    var note = "";
    var freq = this.pitch(data);
    if (freq > 0) {
        var key = this.notes.length * (Math.log(freq / 440) / Math.log(2));
        var noteIndex = (Math.round(key) + 69) % 12;
        note = this.notes[noteIndex];
    }

    return note;
};
