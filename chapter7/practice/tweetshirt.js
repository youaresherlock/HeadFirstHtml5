window.onload = function() {
    var button = document.getElementById("previewButton");
    button.onclick = previewHandler;
}

function previewHandler() {
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    fillBackgroundColor(canvas, context); //绘制方块之前覆盖之前绘制的内容

    var selectObj = document.getElementById("shape");
    // selectedIndex属性返回下拉菜单中所选选项的编号
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;

    if(shape == "squares") {
        for(var squares = 0; squares < 20; squares++){
            drawSquare(canvas, context);
        }
    }
}

function drawSquare(canvas, context) {
    // Math.random() [0, 1)
    var w = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    console.log(w + " ");

    context.fillStyle = "lightblue";
    context.fillRect(x, y, w, w);
}

function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var bgColor = selectObj[index].value;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}