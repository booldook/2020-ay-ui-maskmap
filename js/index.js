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
	var mapContainer = document.getElementById('map'),
		mapOption = { 
				center: new kakao.maps.LatLng(lat, lng),
				level: 3 
		};
	var map = new kakao.maps.Map(mapContainer, mapOption);

	// 약국 정보 생성
	var img = {
		plenty: './img/marker-green.svg', 
		some: './img/marker-yellow.svg',
		few: './img/marker-red.svg',
		empty: './img/marker-grey.svg',
	};
	var positions = [];
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
	console.log(positions);
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










init();





/*
var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
		mapOption = { 
				center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
				level: 3 // 지도의 확대 레벨
		};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
 
// 마커를 표시할 위치와 title 객체 배열입니다 
var positions = [
		{
				title: '카카오', 
				latlng: new kakao.maps.LatLng(33.450705, 126.570677)
		},
		{
				title: '생태연못', 
				latlng: new kakao.maps.LatLng(33.450936, 126.569477)
		},
		{
				title: '텃밭', 
				latlng: new kakao.maps.LatLng(33.450879, 126.569940)
		},
		{
				title: '근린공원',
				latlng: new kakao.maps.LatLng(33.451393, 126.570738)
		}
];

// 마커 이미지의 이미지 주소입니다
var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
		
for (var i = 0; i < positions.length; i ++) {
		
		// 마커 이미지의 이미지 크기 입니다
		var imageSize = new kakao.maps.Size(24, 35); 
		
		// 마커 이미지를 생성합니다    
		var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
		
		// 마커를 생성합니다
		var marker = new kakao.maps.Marker({
				map: map, // 마커를 표시할 지도
				position: positions[i].latlng, // 마커를 표시할 위치
				title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
				image : markerImage // 마커 이미지 
		});
}
*/