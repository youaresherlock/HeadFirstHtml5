this.onmessage = pingPong;
function pingPong(event) {
    if(event.data == "ping") {
        this.postMessage("pong");
    }
}