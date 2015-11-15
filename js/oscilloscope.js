/********************************************************************
* Author: Matias Grioni
* Created: 14 November 2015
*
* An osilloscope type canvas element to specifically interface with
* musical notes.
********************************************************************/

var Oscilloscope = function(canvasId, source, outputId) {
    Grapher.call(this, canvasId, source.getData());

    this.source = source;
    this.output = $("#" + outputId);
    this.totalData = [];
    this.sample = new Sample(source.getSampleRate(), notes);
}

Oscilloscope.prototype = Object.create(Grapher.prototype);
Oscilloscope.prototype.graph = function() {
    this.totalData = [];

    var that = this;
    Grapher.prototype.graph.call(this, function(data) {
        var note = that.sample.note(data);
        that.output.html(note);
        that.totalData.push(note);
    });
};

Oscilloscope.prototype.getData = function() {
    return this.source.getData();
};

Oscilloscope.prototype.total = function() {
    return this.totalData;
};
