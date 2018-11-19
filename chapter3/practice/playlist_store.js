/*
HTML5 web存储: 提供了两种在客户端存储数据的新方法(之前是用cookie来存储)
1.window.localStorage -- 存储没有截止日期的数据
2.window.sessionStorage -- 针对一个session来存储数据
*/

function save(item){
    //这里用JSOn来序列化对象、数组、数值、字符串、布尔值和null
    var playlistArray = getStoreArray("playlist");
    playlistArray.push(item);
    localStorage.setItem("playlist", JSON.stringify(playlistArray));
}

function loadPlaylist(){
    var playlistArray = getSavedSongs();
    var ul = document.getElementById("playlist");
    for(i = 0; i < playlistArray.length; i++){
        var li = document.createElement('li');
        li.innerHTML = playlistArray[i];
        ul.appendChild(li);
    }
}

function getSavedSongs() {
    return getStoreArray("playlist");
}

function getStoreArray(key) {
    var playlistArray = localStorage.getItem(key);
    if(playlistArray == null || playlistArray == ""){
        playlistArray = new Array();
    } else {
        playlistArray = JSON.parse(playlistArray);
    }
    return playlistArray;
}