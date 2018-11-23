var lastReportTime = 0;
window.onload = function() {
    setInterval(handleRefresh, 3000);
}

function handleRefresh() {
    /*反复获取同一个url的资源，浏览器为了提高效率将其缓存起来，因此随机后面加个参数，服务器端将会将其忽略
    可以看到加入后没有缓存, lasttimereporttime参数是告诉服务器只要指定时间之后的报告*/
    var url = "http://gumball.wickedlysmart.com" 
        + "?callback=updateSales"
        + "&random=" + (new Date()).getTime()
        + "&lastreporttime=" + lastReportTime;

    var newScriptElement = document.createElement("script");
    newScriptElement.setAttribute("src", url);
    newScriptElement.setAttribute("id", "jsonp");

    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElementsByTagName("head")[0];
    if(oldScriptElement == null) {
        head.appendChild(newScriptElement);
    } else {
        head.replaceChild(newScriptElement, oldScriptElement);
    }
}

function updateSales(sales) {
    var salesDiv = document.getElementById("sales");
    for(var i = 0; i < sales.length; i++){
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }

    if(sales.length > 0){
        lastReportTime = sales[sales.length - 1].time;
    }
}