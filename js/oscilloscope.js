/********************************************************************
* Author: Matias Grioni
* Created: 14 November 2015
*
*
********************************************************************/

var Oscilloscope = function(canvasId, source, outputId) {
    Grapher.call(this, canvasId, source.getData());

    this.source = source;
    this.output = $("#" + outputId);
    this.totalData = [];
    this.sample = new Sample(source.getSampleRate());
}

Oscilloscope.prototype = Object.create(Grapher.prototype);
Oscilloscope.prototype.graph = function() {
    var that = this;
    Grapher.prototype.graph.call(this, function(data) {
        that.output.html(that.sample.pitch(data));
    });
};

Oscilloscope.prototype.getData = function() {
    return this.source.getData();
};

Oscilloscope.prototype.total = function() {
    return this.totalData;
};
