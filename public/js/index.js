// https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json
// 4c302863cccc615af46f096f1ea543b9

var api = 'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json';
var lat, lng, m = 1000, map, positions, zoom;
var mapContainer = document.getElementById('map');
var img = {
	plenty: './img/marker-green.svg', 
	some: './img/marker-yellow.svg',
	few: './img/marker-red.svg',
	empty: './img/marker-grey.svg',
};
var meter = [0, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];

function init() {
	// 브라우저(디바이스)의 위치정보 가져오기
	navigator.geolocation.getCurrentPosition(function(pos) {
		if(pos) {
			// 위치정보 가져왔을 때
			lat = pos.coords.latitude;
			lng = pos.coords.longitude;
		}
		else {
			// 위치정보 못가져 왔을 때
			lat = 37.401127;
			lng = 126.920475;
		}

		// 지도 생성
		var mapOption = { 
			center: new kakao.maps.LatLng(lat, lng),
			level: 3 
		};
		map = new kakao.maps.Map(mapContainer, mapOption);

		// 지도 이동 이벤트
		kakao.maps.event.addListener(map, 'dragend', function() {
			var latlng = map.getCenter(); 
			lat = latlng.getLat();
			lng = latlng.getLng();
			zoom = map.getLevel();
			$.get(api, {lat: lat, lng: lng, m: meter[zoom]}, getStores);
		});

		// 지도 확대 축소 이벤트
		kakao.maps.event.addListener(map, 'zoom_changed', function() {
			zoom = map.getLevel();
			$.get(api, {lat: lat, lng: lng, m: meter[zoom]}, getStores);
		});

		//약국정보 요청
		$.get(api, {lat: lat, lng: lng, m: meter[3]}, getStores);
	});
}

function getStores(res) {
	// console.log(res);
	// 약국 정보 생성
	positions = [];
	for(var i in res.stores) {
		if(res.stores[i].remain_stat) {
			positions.push({
				title: res.stores[i].name,
				code: res.stores[i].code,
				addr: res.stores[i].addr,
				stat: res.stores[i].remain_stat,
				img: img[res.stores[i].remain_stat],
				latlng: new kakao.maps.LatLng(res.stores[i].lat, res.stores[i].lng)
			});
		}
	}
	setMap(); 
}

function setMap() {
	// console.log(positions);
	for(i in positions) {
		var imageSize = new kakao.maps.Size(40, 40); 
		var markerImage = new kakao.maps.MarkerImage(positions[i].img, imageSize); 
		var marker = new kakao.maps.Marker({
				map: map,
				position: positions[i].latlng,
				title : positions[i].title,
				image : markerImage
		});
	}
}


$("#addr").autocomplete({
	source: getAddr,
	select: function(evt, ui) {
		$(".main-wrap").hide();
		map.setCenter(new kakao.maps.LatLng(ui.item.lat, ui.item.lng));
		$.get(api, {lat: ui.item.lat, lng: ui.item.lng, m: meter[3]}, getStores);
	},
	minLength: 2
});

function getAddr(req, res) {
	$.ajax({
		url: 'https://dapi.kakao.com/v2/local/search/address.json',
		type: 'GET',
		dataType: 'json',
		data: {query: req.term},
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('Authorization', 'KakaoAK acc78d4ce0832806a32cb2a10b5f2c28');
		},
		success: function(result) {
			// console.log(result.documents);
			res(
				result.documents.map(function(v) {
					return {
						lat: v.y,
						lng: v.x,
						value: v.address_name
					}
				})
			);
		},
		error: function(xhr, status) {
			console.log(xhr);
		}
	});
}

$(".bt-this").click(function(){
	$(".main-wrap").hide();
	map.setCenter(new kakao.maps.LatLng(lat, lng));
	$.get(api, {lat: lat, lng: lng, m: meter[3]}, getStores);
});

$(".bt-search").click(function(){
	$(".main-wrap").show();
	$("#addr").val('');
});



init();
