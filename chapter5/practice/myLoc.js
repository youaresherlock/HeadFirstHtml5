var watchId = null; //可以使用这个id来clearWatch
var prevCoords = null; //我们将前一次定位和最近一次定位的经纬度之间距离计算，大于20米才加入Marker标记
var map; //全局变量map,包含创建的Google地图对象
//这是一个字面量对象
var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

window.onload = getMyLocation;

function displayLocation(position) {
    //从position.coords对象中获取纬度和经度
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    //获取经纬度
    var div = window.document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
    div.innerHTML += " (with " + position.coords.accuracy + " meters accuracy)";

    //计算距离
    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km  + " km from the WickedlySmart HQ";

    //创建地图 coords对象有latitude、longitude、accuracy、altitude、altitudeAccuracy、heading、
    //speed等属性，分别表示纬度、经度、准确度、海拔、海拔经度、你的方向、你的速度
    if(map == null){
        showMap(position.coords);
        prevCoords = position.coords; //记录第一次的坐标对象
    } else {
        var meters = computeDistance(position.coords, prevCoords) * 1000; //单位转换
        if(meters > 20) {
            scrollMapToPosition(position.coords);
            prevCoords = position.coords;
        }
    }
}

//计算地理经纬度

//编写 错误处理程序，geolocation对象会向你的处理程序传入一个error对象,
//其中包含一个数值码，描述它未能确定浏览器位置的原因。
function displayError(error) {
    alert(typeof(error.code));
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    
    var errorMessage = errorTypes[error.code];
    //这里error.code是一个number值，errorTypes会把数字属性自动转换为字符串，可以直接
    //errorTypes[error.code]来索引，也可以用errorTypes["1"]类似形式来索引
    if(error.code == 0 || error.code == 2){
        //对于0和2错误，error.message可能还有额外的信息
        errorMessage = errorMessage + " " + error.message; 
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function getMyLocation() {
    if(navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(displayLocation, 
        //     displayError);
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("Oops, no geolocation support");
    }
}

//利用Haversine公式计算经纬度点之间的距离

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371; //radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
        Math.cos(startLatRads) * Math.cos(destLatRads) * 
        Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

//创建地图 参考开发文档https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs#Adding_a_custom_marker
//google map platform: https://developers.google.cn/maps/documentation/javascript/tutorial
function showMap(coords) {
    //使用Google提供的构造函数来创建一个包含经纬度的对象
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    
        /**
         * Google提供了一些选项来控制如何创建地图。
         * zoom: 范围是0~21的一个值，是地图的比例尺
         * center: 地图中我们的位置是居中 
         * mapTypedId: 地图的类型(道路地图、卫星地图、或者二者兼有)
         * SATELLITE、HYBRID
         */
    var mapOptions = {
        zoom: 20,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions); //参数是一个元素对象、和我们的选项对象

    var title = "Your Location:";
    var content = "You are here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
} 

//创建marker
function addMarker(map, latLong, title, content) {
    //makerOptions对象包含了经纬度，地图，标题，以及是否可以点击
    var markerOptions = {
        position: latLong,
        map: map,
        title: title,
        clickable: true
    };

    var marker = new google.maps.Marker(markerOptions);
    var infoWindowOptions = {
        content: content,
        position: latLong
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker, "click", function(){
        infoWindow.open(map);
    });
    // marker.addListener("click", function() {
    //     infoWindow.open(map, marker);
    // })
}

/**
 * 持续跟踪位置 geolocation.watchPosition方法有三个参数，
 * 成功处理函数，错误处理函数，以及选项控制地理定位的超时时间，最大生存时间，是否最高精度等。
 */
function watchLocation() {
    //每次位置更新会调用displayLocation函数
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

function clearWatchButton() {
    if(watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null; 
    }
}

//移动的时候我们可以在地图上添加多个marker标志，下面定义一个函数
function scrollMapToPosition(coords) {
    var latitude = coords.latitude;
    var longitude = coords.longtitude;
    var latLong = new google.maps.LatLng(latitude, longitude);

    map.panTo(latlong); //地图的panTo方法取得坐标对象，移动到地图中心

    addMarker(map, latlong, "Your new location", "You moved to: " + 
        latitude + ", " + longitude);
}