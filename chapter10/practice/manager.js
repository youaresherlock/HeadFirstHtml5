window.onload = function() {
    // Worker(aURL, Options) aURL必须遵循同源策略
    var worker = new Worker("worker.js");

    worker.postMessage("ping");

    worker.onmessage = function(event) {
        var message = "Worker says " + event.data;
        document.getElementById("output").innerHTML = message;
    }
}