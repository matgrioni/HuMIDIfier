$(document).ready(function() {
    // Polyfill for multiple browser support for navigator object
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);

    m = new Microphone(2048);
    m.request();

    var o = null;

    $("#record").on("click", function() {
        if (m.allowed) {
            o = new Oscilloscope("oscilloscope", m);
            o.graph();
        } else {
            alert("You never allowed the microphone. Refresh");
        }
    });

    $("#stop").on("click", function() {
        if (o !== null) {
            o.stop();
        }
    });

    var noteDisplay = $("#note");
    noteDisplay.html("-");
});
