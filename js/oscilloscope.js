/********************************************************************
* Author: Matias Grioni
* Created: 14 November 2015
*
*
********************************************************************/

var Oscilloscope = function(canvasId, source) {
    this.source = source;
    Grapher.call(this, canvasId, this.source.getData());
}

Oscilloscope.prototype = Object.create(Grapher.prototype);

Oscilloscope.prototype.getData = function() {
    return this.source.getData();
};
