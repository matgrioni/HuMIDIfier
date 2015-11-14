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
};

Grapher.prototype.graph = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this._draw();
};

Grapher.prototype._draw = function() {
    var curData = this.getData();

    if (curData.length > 0) {
        var that = this;
        drawVisual = requestAnimationFrame(function() {
            that._draw();
        });

        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = "rgb(0, 0, 0)";
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = "rgb(100, 50, 50)";
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

