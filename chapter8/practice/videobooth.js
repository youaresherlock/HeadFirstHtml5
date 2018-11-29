window.onload = function() {
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

    //默认video1和normal按下
    pushUnpushButtons("video1", []);
    pushUnpushButtons("normal", []);
}

function handleControl(e) {
    var id = e.target.getAttribute("id");

    if(id == "play") {
        //play和pause只有一个能处于按下状态
        pushUnpushButtons("play", ["pause"]);
    } else if(id == "pause") {
        pushUnpushButtons("pause", ["play"]);
    } else if(id == "loop") {
        // loop可以按下也可以松开
        if(isButtonPushed("loop")) {
            pushUnpushButtons("", ["loop"]);
        } else {
            pushUnpushButtons("loop", []);
        }
    } else if(id == "mute") {
        // mute按钮有两种状态
        if(isButtonPushed("mute")) {
            pushUnpushButtons("", ["mute"]);
        } else {
            pushUnpushButtons("mute", []);
        }
    }
}

function setEffect(e) {
    var id = e.target.getAttribute("id");

    if(id == "normal") {
        pushUnpushButtons("normal", ["western", "noir", "scifi"]);
    } else if(id == "western") {
        pushUnpushButtons("western", ["normal", "noir", "scifi"]);
    } else if(id == "noir") { 
        pushUnpushButtons("noir", ["normal", "western", "scifi"]);
    } else if(id == "scifi") {
        pushUnpushButtons("scifi", ["normal", "western", "noir"]);
    }
}

//实现在两个视频之间进行切换
function setVideo(e) {
    var id = e.target.getAttribute("id");
    if(id == "video1") {
        pushUnpushButtons("video1", ["video2"]);
    } else if(id == "video2") {
        pushUnpushButtons("video2", ["video1"]);
    }
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

