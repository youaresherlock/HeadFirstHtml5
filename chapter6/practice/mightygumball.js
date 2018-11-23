/**
 * 跨域HTTP请求
 * 如果你需要从不同的服务器(不同的域名)上获取数据就需要使用跨域HTTP请求，
 * 跨域请求在网页上非常常见。很多网页从不同服务器上载入CSS，图片，JS脚本等。
 * 在现代浏览器中，为了数据的安全，所有请求被严格限制在同一域名下， 如果需要
 * 调用不同站点的数据，需要通过跨域来解决。
 * 其实这个ajax请求可以被服务端拿到，但是在Javascript里面却拿不到服务端的repsonse
 * 1.可以在请求控制器上加上header("Access-Control-Allow-Origin:*");
 * 2.在IIS,Apache,Nginx可以直接配置Access-Control-Allow-Origin跨域
 * 3.使用Jsonp(JSON with Padding)是json的一种"使用模式",可以让网页从别的
 * 域名那获取资料。通过引用js文件传递数据
 */

window.onload = init 

function init() {
    getSales();
}

//XMLHttpRequest Level2
function getSales() {
    var url = "http://localhost/gumball/sales.json";
    /**
     * XMLHttpRequest用于在后台与服务器交换数据。这意味着可以在
     * 不重新加载整个网页的情况下，对网页的某部分进行更新。
     * 发送请求，使用open()和send()方法
     * open(method, url, async)
     * 规定请求的类型,url以及是否异步处理请求 async为true是异步
     * send(string) 将请求发送到服务器,string:仅用于POST请求
     */
    var request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function() {
        if(request.status == 200) {
            updateSales(request.responseText);
        }
    };
    request.send(null); 
}

//XMLHttpRequest Level1
function getSales_XHRv1() {
    var url = "http://localhost/gumball/sales.json";

    var request = new XMLHttpRequest();
    request.open("GET", url);

    //Level1中没有request.onload属性，所以应当使用request.onreadystatechange
    /*
    readystate存有XMLHttpRequest的状态信息， 从0到4变化
    0: 请求初始化
    1: 服务器连接已建立
    2: 请求已接受
    3: 请求处理中
    4: 请求已完成，且相应已就绪
    每当readyState改变时，就会触发onreadstatechange事件，总共触发5次(如果可以的话)
    */
    request.onreadystatechange = function() {
        if(request.readystate == 4 && request.state == 200){
            updateSales(request.responseText);
        }
    };
    request.send(null);
}

function updateSales(responseText) {
    var salesDiv = document.getElementById("sales");
    // salesDiv.innerHTML = responseText;
    //将JSON串转化成一个JavaScript对象,sales是一个数组
    var sales = JSON.parse(responseText);
    for(var i = 0; i < sales.length; i++){
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        // appendChild()方法可向节点的子节点列表的末尾添加新的子节点
        salesDiv.appendChild(div);
    }
}
