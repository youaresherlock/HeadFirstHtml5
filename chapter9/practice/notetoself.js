window.onload = init;

function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;
    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if(key.substring(0, 6) == "sticky") {
            var value = localStorage.getItem(key);
            addStickyToDOM(value);
        }
    }
}

function createSticky() {
    var value = document.getElementById("note_text").value;
    var key = "sticky_" + localStorage.length;
    localStorage.setItem(key, value);

    addStickyToDOM(value);
}

function addStickyToDOM(value) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    /*
    span标签如果不应用样式，那么<span>元素中的文本与其他文本不会任何视觉上的差异。
     */
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
}
