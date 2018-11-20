var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

window.onload = getMyLocation;

function displayLocation(position) {
    //从position.coords对象中获取纬度和经度
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = window.document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;

    var km = computeDistance(position.coords, ourCoords);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km  + " km from the WickedlySmart HQ";
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
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
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