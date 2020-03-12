// https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json
// navigator.geolocation.getCurrentPosition(getPosition);

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
	console.log(res);
}










init();