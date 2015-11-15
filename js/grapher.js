/********************************************************************
* Author: Matias Grioni
* Created: 14 November 2015
*
* A grapher for a canvas object. Provide the id for the canvas elem
* for a canvas and provide the data to be graphed in a bar graph.
********************************************************************/

var Grapher = function(canvasId, data) {
    this.canvas = $("#" + canvasId);
    this.context = this.canvas[0].getContext("2d");

    this.width = this.canvas.width();
    this.height = this.canvas.height();
    this.data = data;

    this.running = false;
};

Grapher.prototype.graph = function(updateCallback) {
    this.updateCallback = updateCallback;
    this.running = true;

    this.context.clearRect(0, 0, this.width, this.height);
    this._draw();
};

Grapher.prototype.stop = function() {
    this.running = false;
}

Grapher.prototype._draw = function() {
    var curData = this.getData();

    if (curData.length > 0 && this.running) {
        var that = this;
        drawVisual = requestAnimationFrame(function() {
            that._draw();
            if(that.updateCallback)
                that.updateCallback(curData);
        });

        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = "rgb(0, 0, 0)";
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = "rgb(66, 220, 163)";
        var barWidth = (this.width / curData.length) * 2.5;
        for(var i = 0; i < curData.length; i++) {
            var barHeight = curData[i];
            var y = this.height - barHeight;
            var x = i * barWidth + i;
            this.context.fillRect(x, y, barWidth, barHeight);
        }
    }
};

Grapher.prototype.getData = function() {
    return this.data;
};

