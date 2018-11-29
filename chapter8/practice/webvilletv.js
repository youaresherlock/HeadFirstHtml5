var position = 0; //记录视频列表索引
var playlist; //保存视频播放列表数组
var video; //保存video元素的引用

window.onload = function() {
    playlist = ["../video/preroll",
                "../video/areyoupopular",
                "../video/destinationearth"];
    video = document.getElementById("video");
    video.addEventListener("ended", nextVideo, false);
    video.src = playlist[position] + getFormatExtension();
    video.load(); //加载这个视频
    video.play();
}

function nextVideo() {
    position++;
    if(position >= playlist.length) {
        position = 0;
    }
    // if(position%playlist.length == 0){
    //     position = 0;
    // }
    video.src = playlist[position] + getFormatExtension();
    video.load();
    video.play();
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