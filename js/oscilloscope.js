/********************************************************************
* Author: Matias Grioni
* Created: 14 November 2015
*
*
********************************************************************/

var Oscilloscope = function(canvasId, source) {
    this.source = source;
    Grapher.call(this, canvasId, this.source.getData());
    this.totalData = [];
}

Oscilloscope.prototype = Object.create(Grapher.prototype);
Oscilloscope.prototype._draw = function() {
    this.totalData.push(this.getData());
    Grapher.prototype._draw.call(this);
};

Oscilloscope.prototype.getData = function() {
    return this.source.getData();
};

Oscilloscope.prototype.total = function() {
    return this.totalData;
};
