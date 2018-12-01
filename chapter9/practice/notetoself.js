// window.onload = init;
// 下面的代码可能会出现key重复问题，同时如果同域中有其他的数据，会
// 非常影响性能
// function init() {
//     var button = document.getElementById("add_button");
//     button.onclick = createSticky;
//     for(var i = 0; i < localStorage.length; i++) {
//         var key = localStorage.key(i);
//         if(key.substring(0, 6) == "sticky") {
//             var value = localStorage.getItem(key);
//             addStickyToDOM(value);
//         }
//     }
// }

// function createSticky() {
//     var value = document.getElementById("note_text").value;
//     var key = "sticky_" + localStorage.length;
//     localStorage.setItem(key, value);

//     addStickyToDOM(value);
// }

//最终方案(类似购物车保存购物url一样)
window.onload = init;

function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;

    var stickiesArray = getStickiesArray();

    for(var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i];
        var value = localStorage[key];
        addStickyToDOM(key, value);
    }
}

function createSticky() {
    var value = document.getElementById("note_text").value;
    var temp = value.trim(); //返回的是一个新的字符串，去除首位空格
    if(!temp) {
        return;
    }
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    var key = "sticky_" + currentDate.getTime();
    localStorage.setItem(key, value);
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    addStickyToDOM(key, value);
}

function getStickiesArray() {
    //localStorage.getItem(key) //如果不存在为null
    var stickiesArray = localStorage.getItem("stickiesArray");
    
    if(!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    } else {
        stickiesArray = JSON.parse(stickiesArray); //JSON字符串解析成对象
    }

    return stickiesArray;
}

//此函数不变
function addStickyToDOM(key, value) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    /*
    span标签如果不应用样式，那么<span>元素中的文本与其他文本不会任何视觉上的差异。
     */
    var span = document.createElement("span");
    var picture = document.createElement("img");
    picture.setAttribute("class", "delete");
    picture.src = "delete2.png";
    span.setAttribute("class", "sticky");
    span.innerHTML = value;
    sticky.setAttribute("id", key);
    sticky.appendChild(span);
    sticky.appendChild(picture);
    stickies.appendChild(sticky);
    picture.onclick = deleteSticky;
}

function deleteSticky(e) {
    //parentNode属性可返回某结点的父结点，target为
    // 所点击并生成事件的元素
    var key = e.target.parentNode.id;
    localStorage.removeItem(key);
    var stickiesArray = getStickiesArray();
    for(var i = 0; i < stickiesArray.length; i++) {
        if(key == stickiesArray[i]) {
            //array.splice(index, howmany, item1,....., itemX)
            stickiesArray.splice(i, 1);
        }
    }
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    removeStickyFromDom(key); 
} 

function removeStickyFromDom(key) {
    var sticky = document.getElementById(key);
    //removeChild(node)方法可从子节点列表中删除某个节点
    sticky.parentNode.removeChild(sticky);
}