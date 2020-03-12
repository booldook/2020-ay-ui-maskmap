// https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json
// 4c302863cccc615af46f096f1ea543b9

var api = 'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json';
var lat, lng, m = 1000;

function init() {
	navigator.geolocation.getCurrentPosition(function(pos) {
		if(pos) {
			lat = pos.coords.latitude;
			lng = pos.coords.longitude;
			$.get(api, {lat: lat, lng: lng, m: m}, setMap);
		}
	});
}

function setMap(res) {
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = { 
				center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
				level: 3 // 지도의 확대 레벨
		};

	// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
	var map = new kakao.maps.Map(mapContainer, mapOption); 
}










init();