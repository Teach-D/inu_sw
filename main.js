/* JavaScript 수정 */
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector("#sidebar-toggle");
    const sidebarExpand = document.querySelector("#sidebar-expand");
    const mapContainer = document.querySelector(".map-container");
    
    // 초기에 확장 버튼을 숨김
    sidebarExpand.style.display = "none";

    // 사이드바 토글 버튼 클릭 이벤트 처리
    sidebarToggle.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        if (sidebar.classList.contains("collapsed")) {
            sidebarExpand.style.display = "block"; // 확장 버튼 표시
            mapContainer.style.marginLeft = "30px"; // 지도 위치 조정
        } else {
            sidebarExpand.style.display = "none"; // 확장 버튼 숨김
            mapContainer.style.marginLeft = "300px"; // 원래 위치로 복원
        }
    });

    // 사이드바 확장 버튼 클릭 이벤트 처리
    sidebarExpand.addEventListener("click", function () {
        sidebar.classList.remove("collapsed");
        sidebarExpand.style.display = "none"; // 확장 버튼 숨김
        mapContainer.style.marginLeft = "300px"; // 원래 위치로 복원
    });
});

// JavaScript 코드
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("share-button").addEventListener("click", function() {
        // 현재 페이지의 URL을 가져옵니다.
        var currentURL = window.location.href;
        
        // 소셜 미디어에서 공유할 때 사용할 URL을 생성합니다.
        var shareURL = "https://example.com/share?url=" + encodeURIComponent(currentURL);

        // 소셜 미디어 사이트를 새 창으로 열어서 URL을 공유합니다.
        window.open(shareURL, "_blank", "width=600, height=400");
    });
});



var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(37.556826, 126.8486567),
    level: 9
};
var map = new kakao.maps.Map(container, options),
    customOverlay = new kakao.maps.CustomOverlay({});

// 지도에 교통정보를 표시하도록 지도타입을 추가합니다
map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);    

// 아래 코드는 위에서 추가한 교통정보 지도타입을 제거합니다
// map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  



$.getJSON("https://raw.githubusercontent.com/southkorea/seoul-maps/master/kostat/2013/json/seoul_municipalities_geo_simple.json", function (geojson) {
    var data = geojson.features;
    //console.log(data);
    data.forEach(function (feature) {
        var coordinates = feature.geometry.coordinates[0]; // 첫 번째 좌표를 사용하려면
        var name = feature.properties.name; // 올바른 속성 이름을 사용하세요
        //console.log(feature.properties);
        displayArea(coordinates, name);
    });
});

var polygons = [];

function displayArea(coordinates, name) {
    var path = [];
    var points = [];

    coordinates.forEach(function (coordinate) {
        var point = new Object(); 
        point.x = coordinate[1];
        point.y = coordinate[0];
        points.push(point);
        path.push(new daum.maps.LatLng(coordinate[1], coordinate[0]));  
    });
    var polygon = new daum.maps.Polygon({
        map : map, // 다각형을 표시할 지도 객체
        path : path,
        strokeWeight : 2,
        strokeColor : '#004c80',
        strokeOpacity : 0.8,
        fillColor : '#fff',
        fillOpacity : 0.7
    });

    polygons.push(polygon);
    polygon.setMap(map);

     // 폴리곤의 중심 좌표를 계산하여 구역 이름을 표시할 위치로 설정
     var centroidPoint = centroid(points);
    
     // 폴리곤의 이름을 표시하는 커스텀 오버레이를 생성하고 지도에 추가
// 폰트 크기를 조절할 수 있는 스타일을 추가합니다

     // 마우스 이벤트를 통해 오버레이를 표시/숨김
     kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
        var centroidPoint = centroid(points);
      
        customOverlay.setMap(map);
     });
     
     kakao.maps.event.addListener(polygon, 'mouseout', function () {
         customOverlay.setMap(null);
         
     });
 
    // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다 
    // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
    kakao.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) {
        polygon.setOptions({fillColor: '#09f'});

        customOverlay.setContent('<div class="area-name" style="font-size: 25px;">' + name + '</div>');
    
        customOverlay.setPosition(mouseEvent.latLng); 
        //customOverlay.setMap(map);
    });

    // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
    // 커스텀 오버레이를 지도에서 제거합니다 
    kakao.maps.event.addListener(polygon, 'mouseout', function() {
        polygon.setOptions({fillColor: '#fff'});
        customOverlay.setMap(null);
    }); 

    // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다 
    kakao.maps.event.addListener(polygon, 'click', function(mouseEvent) {
        // 현재 지도 레벨에서 2레벨 확대한 레벨
        var level = map.getLevel()-2;
        //console.log(level);
        // 지도를 클릭된 폴리곤의 중앙 위치를 기준으로 확대합니다
        map.setLevel(level, {anchor: centroid(points), animate: {
            duration: 350            //확대 애니메이션 시간
        }});            
 
        var naverMapURL = 'https://map.naver.com/v5/search/';
         // 새 창으로 네이버 맵 열기
    window.open(naverMapURL, '_blank');

        deletePolygon(polygons);                    //폴리곤 제거     
    });
}

//centroid 알고리즘 (폴리곤 중심좌표 구하기 위함)
function centroid (points) {
    var i, j, len, p1, p2, f, area, x, y;
 
    area = x = y = 0;
 
    for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
            p1 = points[i];
            p2 = points[j];
 
            f = p1.y * p2.x - p2.y * p1.x;
            x += (p1.x + p2.x) * f;
            y += (p1.y + p2.y) * f;
            area += f * 3;
    }
    return new kakao.maps.LatLng(x / area, y / area);
}

//지도 위 표시되고 있는 폴리곤 제거
function deletePolygon(polygons) {
    for (var i = 0; i < polygons.length; i++) {
        polygons[i].setMap(null);
    }
    polygons = [];
}

