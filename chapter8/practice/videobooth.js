var videos = {video1: "../video/demovideo1", 
              video2: "../video/demovideo2"};

var effectFunction = null;

window.onload = function() {
    var video = document.getElementById("video");
    // 要播放视频的url
    video.src = videos.video1 + getFormatExtension(); 
    video.load();

    // document.querySelectorAll()选择与一个CSS选择器匹配的元素
    var controlLinks = document.querySelectorAll("a.control");
    for(var i = 0; i < controlLinks.length; i++) {
        controlLinks[i].onclick = handleControl;
    }

    var effectLinks = document.querySelectorAll("a.effect");
    for(var i = 0; i < effectLinks.length; i++) {
        effectLinks[i].onclick = setEffect;
    }

    var videoLinks = document.querySelectorAll("a.videoSelection");
    for(var i = 0; i < videoLinks.length; i++) {
        videoLinks[i].onclick = setVideo;
    }

    video.addEventListener("play", processFrame, false);
    //视频播放完play按钮自动弹回，可以添加事件
    video.addEventListener("ended", endedHandler, false);

    //默认video1和normal按下
    pushUnpushButtons("video1", []);
    pushUnpushButtons("normal", []);
}

function processFrame() {
    var video = document.getElementById("video");
    if(video.paused || video.ended) {
        return;
    }

    var bufferCanvas = document.getElementById("buffer");
    var displayCanvas = document.getElementById("display");
    var buffer = bufferCanvas.getContext("2d");
    var display = displayCanvas.getContext("2d");

    buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);
    var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);

    var length = frame.data.length / 4;//rgba数据数组
    for(var i = 0; i < length; i++) {
        var r = frame.data[i * 4 + 0];
        
    }
}

function endedHandler() {
    pushUnpushButtons("", ["play"]);
}

function handleControl(e) {
    var id = e.target.getAttribute("id");
    var video = document.getElementById("video");

    if(id == "play") {
        //play和pause只有一个能处于按下状态
        pushUnpushButtons("play", ["pause"]);
        if(video.ended) { //video.ended属性返回视频是否结束
            video.load();
        }
        video.play();
    } else if(id == "pause") {
        pushUnpushButtons("pause", ["play"]);
        video.pause();
    } else if(id == "loop") {
        // loop可以按下也可以松开
        if(isButtonPushed("loop")) {
            pushUnpushButtons("", ["loop"]);
        } else {
            pushUnpushButtons("loop", []);
        }
        video.loop = !video.loop;
    } else if(id == "mute") {
        // mute按钮有两种状态
        if(isButtonPushed("mute")) {
            pushUnpushButtons("", ["mute"]);
        } else {
            pushUnpushButtons("mute", []);
        }
        video.muted = !video.muted;
    }
}

function setEffect(e) {
    var id = e.target.getAttribute("id");

    if(id == "normal") {
        pushUnpushButtons("normal", ["western", "noir", "scifi"]);
        effectFunction = null;
    } else if(id == "western") {
        pushUnpushButtons("western", ["normal", "noir", "scifi"]);
        effectFunction = western;
    } else if(id == "noir") { 
        pushUnpushButtons("noir", ["normal", "western", "scifi"]);
        effectFunction = noir;
    } else if(id == "scifi") {
        pushUnpushButtons("scifi", ["normal", "western", "noir"]);
        effectFunction = scifi;
    }
}

//实现在两个视频之间进行切换
function setVideo(e) {
    var id = e.target.getAttribute("id");
    var video = document.getElementById("video");

    if(id == "video1") {
        pushUnpushButtons("video1", ["video2"]);
    } else if(id == "video2") {
        pushUnpushButtons("video2", ["video1"]);
    }

    video.src = videos[id] + getFormatExtension();
    video.load();
    video.play();
}

//pushUnpushButtons负责按钮状态，它的参数包括一个要按下的按钮的id,
//以及不再按下的一个或多个按钮(放在一个数组中)
function pushUnpushButtons(idToPush, idArrayToUnpush) {
    if(idToPush != "") {
        var anchor = document.getElementById(idToPush);
        var theClass = anchor.getAttribute("class");
        if(!theClass.indexOf("selected") >= 0) {
            theClass = theClass + " selected"; //在锚中增加"selected"类，从而标志这个按钮的状态
            //Element.setAttribute(name, value);
            anchor.setAttribute("class", theClass);
            var newImage = "url(../images/" + idToPush + "pressed.png";
            anchor.style.backgroundImage = newImage; //更新锚元素的背景图像
        }
    }

    // 循环处理不再按下的按钮id数组中的各个元素，获取各个锚，改变图片
    for(var i = 0; i < idArrayToUnpush.length; i++) {
        anchor = document .getElementById(idArrayToUnpush[i]);
        theClass = anchor.getAttribute("class");
        if(theClass.indexOf("selected") >= 0) {
            theClass = theClass.replace(" selected", ""); //从类中删除"selected"
            anchor.setAttribute("class", theClass);
            anchor.style.backgroundImage = "";
        }
    }
}

function isButtonPushed(id) {
    var anchor = document.getElementById(id);
    var theClass = anchor.getAttribute("class");
    return (theClass.indexOf("selected") >= 0);
}

/*
canPlayType(type)方法确定你能播放一个视频格式的可能性
返回以下三个值之一: 
""空字符串: 浏览器不支持该音频/视频类型
"maybe": 浏览器也许支持
"probably" 浏览器最可能支持
type描述要检测的音频/视频类型，也可以包含解码器
 */
function getFormatExtension() {
    if(video.canPlayType("video/mp4") != "") {
        return ".mp4";
    } else if(video.canPlayType("video/webm") != "") {
        return ".webm";
    } else if(video.canPlayType("vide/ogg") != "") {
        return ".ogv";
    }
}
