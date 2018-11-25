window.onload = function() {
    var button = document.getElementById("previewButton");
    button.onclick = test;
}

function test() {
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    ctx = context;
    ctx.beginPath();
    ctx.moveTo(25,25);
    ctx.lineTo(105,25);
    ctx.lineTo(25,105);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.stroke(); //通过线条来绘制图形轮廓
    ctx.fillStyle = "red";
    ctx.fill();
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
    } else if(shape == "circles") {
        for(var circles = 0; circles < 20; circles++) {
            drawCircle(canvas, context);
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

function drawCircle(canvas, context) {
    /*
    arc(x, y, radius, startAngle, endAngle. anticlockwise);
    anticlockwise是true,表示逆时针生成，false表示顺时针生成
    */
   var radius = Math.floor(Math.random() * 40);
   var x = Math.floor(Math.random() * canvas.width);
   var y = Math.floor(Math.random() * canvas.height);

   context.beginPath();
   context.arc(x, y, radius, 0, 2 * degreesToRadians(360), true);
   
   context.fillStyle = "lightblue";
   context.fill();
}

function fillBackgroundColor(canvas, context) {
    /**
     * 下面是清空画布的三种方法:
     * 1. canvas每当高度或宽度被重设时，画布内容就会被清空。
     * canvas.height = canvas.height;
     * 2.使用clearRect方法
     * context.clearRect(0, 0, canvas.width, canvas.height);
     * 3.用某一特定颜色填充画布，从而达到清空的目的
     * context.filleStyle = "#000000";
     * context.beginPath();
     * context.fillRect(0, 0, canvas.width, canvas.height);
     * context.closePath();
     */
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var bgColor = selectObj[index].value;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

//将度转换成弧度
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function updateTweets(tweets) {
	var tweetsSelection = document.getElementById("tweets");

	// add all tweets to the tweets menu
	for (var i = 0; i < tweets.length; i++) {
		tweet = tweets[i];

		// create option
		var option = document.createElement("option");
		option.text = tweet.text;

		// strip any quotes out of the tweet so they don't mess up our option
		option.value = tweet.text.replace("\"", "'");

		// add option to select
		tweetsSelection.options.add(option);
    }
	// make sure the top tweet is selected
	tweetsSelection.selectedIndex = 0;
}