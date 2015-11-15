notes = ["c", "csharp", "d", "dsharp", "e", "f", "fsharp", "g", "gsharp", "a",
         "asharp", "b"];

$(document).ready(function() {
    // Polyfill for multiple browser support for navigator object
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);

    m = new Microphone(2048);
    m.request();

    var o = null;

    var keyDisplay = $("#key");
    var chordsDisplay = $("#chords");

    $("#record").on("click", function() {
        if (m.allowed) {
            o = new Oscilloscope("oscilloscope", m, "node");
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

    var that = this;
    $(".music_type").on("click", function() {
        frequencies = noteFrequencies(o.total());
        var g = new Generator($(this).html().toLowerCase(), frequencies);
        g.load(function() {
            keyDisplay.html(g.key);
        });
    });
});

function noteFrequencies(data) {
    frequencies = []
    for(var i = 0; i < notes.length; i++) {
        var curNote = notes[i];

        var counter = 0;
        for(var j = 0; j < data.length; j++) {
            if(data[j] == curNote)
                counter++;
        }

        frequencies.push({"note": curNote, "freq": counter});
    }

    return frequencies;
}
