
/*页面完全加载时才会执行这个函数*/
window.onload = init

function init() {
    var button = document.getElementById("addButton");
    /*给按钮的点击事件句柄赋值相应的事件处理函数*/
    button.onclick = handleButtonClick;

    loadPlaylist();
}

// function handleButtonClick() {
//     var textInput = document.getElementById("songTextInput");
//     var songName= textInput.value;
//     if(songName == ""){
//         alert("Please enter a song");
//     } else {
//         alert("Adding " + songName);
//     }
// } 

function handleButtonClick() {
    var textInput = document.getElementById("songTextInput");
    var songName = textInput.value;
    var li = document.createElement("li"); //创建元素 
    li.innerHTML = songName;
    var ul = document.getElementById("playlist"); //获取父亲元素
    ul.appendChild(li); //加入子节点元素
    
    save(songName);
}