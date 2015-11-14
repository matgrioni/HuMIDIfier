$(document).ready(function() {
    // Polyfill for multiple browser support for navigator object
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);

    m = new Microphone();
    m.request();

    $("#record").on("click", function() {
        if (m.allowed) {
            m.getData();
        } else {
            alert("You never allowed the microphone. Refresh");
        }
    });
});
