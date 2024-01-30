/* JavaScript 수정 */



// 사이드바에서 정보 받아오기
var count = 1;
var send = document.getElementById("send");
var c = 0;

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

var fillOpacity = 0.8;



$.getJSON("https://raw.githubusercontent.com/southkorea/seoul-maps/master/kostat/2013/json/seoul_municipalities_geo_simple.json", function (geojson) {


    var data = geojson.features;
    //console.log(data);
    data.forEach(function (feature) {
        var coordinates = feature.geometry.coordinates[0]; // 첫 번째 좌표를 사용하려면
        var name = feature.properties.name; // 올바른 속성 이름을 사용하세요
        //console.log(feature.properties);
        displayArea(coordinates, name, count);

    });
});

var polygons = [];

send.addEventListener('click', function(event){
    var count = document.getElementById("crimeMethod").value;
    //console.log(count)

    $.getJSON("https://raw.githubusercontent.com/southkorea/seoul-maps/master/kostat/2013/json/seoul_municipalities_geo_simple.json", function (geojson) {


        var data = geojson.features;
        //console.log(data);
        data.forEach(function (feature) {
            var coordinates = feature.geometry.coordinates[0]; // 첫 번째 좌표를 사용하려면
            var name = feature.properties.name; // 올바른 속성 이름을 사용하세요
            //console.log(feature.properties);
            displayArea(coordinates, name, count);

        });
    });

    deletePolygon(polygons);
    event.preventDefault()
});

function displayArea(coordinates, name, count1) {



    var path = [];
    var points = [];
    var a = ['756159', '789371']
    coordinates.forEach(function (coordinate) {
        var point = new Object();
        point.x = coordinate[1];
        point.y = coordinate[0];
        points.push(point);
        path.push(new daum.maps.LatLng(coordinate[1], coordinate[0]));
    });
    //9edac7
    var fillColor;



    if(count1 == 1) {
        if (name === "종로구") {
            fillColor = '#D30000'; // Red for 강서구
        } else if (name === "중구") {
            fillColor = '#F4C6C6'; // Blue for 은평구
        } else if (name === "용산구") {
            fillColor = '#F95959'; // Blue for 은평구
        }  else if (name === "성동구") {
            fillColor = '#EF2828'; // Blue for 은평구
        }  else if (name === "광진구") {
            fillColor = '#E00000'; // Blue for 은평구
        }  else if (name === "동대문구") {
            fillColor = '#D80000'; // Blue for 은평구
        }  else if (name === "중랑구") {
            fillColor = '#CE0000'; // Blue for 은평구
        }  else if (name === "성북구") {
            fillColor = '#ED0000'; // Blue for 은평구
        }  else if (name === "강북구") {
            fillColor = '#F95959'; // Blue for 은평구
        }  else if (name === "도봉구") {
            fillColor = '#FFC1C1'; // Blue for 은평구
        }  else if (name === "노원구") {
            fillColor = '#EA0000'; // Blue for 은평구
        }  else if (name === "은평구") {
            fillColor = '#E20000'; // Blue for 은평구
        }  else if (name === "서대문구") {
            fillColor = '#EF2828'; // Blue for 은평구
        }  else if (name === "마포구") {
            fillColor = '#E20000'; // Blue for 은평구
        }  else if (name === "양천구") {
            fillColor = '#F78888'; // Blue for 은평구
        }  else if (name === "강서구") {
            fillColor = '#AD0000'; // Blue for 은평구
        }  else if (name === "구로구") {
            fillColor = '#BC0000'; // Blue for 은평구
        }  else if (name === "금천구") {
            fillColor = '#D80000'; // Blue for 은평구
        }  else if (name === "영등포구") {
            fillColor = '#E00000'; // Blue for 은평구
        }  else if (name === "동작구") {
            fillColor = '#FFA3A3'; // Blue for 은평구
        }  else if (name === "관악구") {
            fillColor = '#990000'; // Blue for 은평구
        }  else if (name === "서초구") {
            fillColor = '#D30000'; // Blue for 은평구
        }  else if (name === "강남구") {
            fillColor = '#AA0000'; // Blue for 은평구
        }  else if (name === "송파구") {
            fillColor = '#E20000'; // Blue for 은평구
        }  else if (name === "강동구") {
            fillColor = '#F20000'; // Blue for 은평구
        }

    } else if(count1 == 2) {
        if (name === "종로구") {
            fillColor = '#D30000'; // Red for 강서구
        } else if (name === "중구") {
            fillColor = '#C10000'; // Blue for 은평구
        } else if (name === "용산구") {
            fillColor = '#F20000'; // Blue for 은평구
        }  else if (name === "성동구") {
            fillColor = '#EA0000'; // Blue for 은평구
        }  else if (name === "광진구") {
            fillColor = '#F78888'; // Blue for 은평구
        }  else if (name === "동대문구") {
            fillColor = '#CE0000'; // Blue for 은평구
        }  else if (name === "중랑구") {
            fillColor = '#EF2828'; // Blue for 은평구
        }  else if (name === "성북구") {
            fillColor = '#FFC1C1'; // Blue for 은평구
        }  else if (name === "강북구") {
            fillColor = '#ED0000'; // Blue for 은평구
        }  else if (name === "도봉구") {
            fillColor = '#FFA3A3'; // Blue for 은평구
        }  else if (name === "노원구") {
            fillColor = '#F95959'; // Blue for 은평구
        }  else if (name === "은평구") {
            fillColor = '#FFA3A3'; // Blue for 은평구
        }  else if (name === "서대문구") {
            fillColor = '#EF2828'; // Blue for 은평구
        }  else if (name === "마포구") {
            fillColor = '#EF2828'; // Blue for 은평구
        }  else if (name === "양천구") {
            fillColor = '#F4C6C6'; // Blue for 은평구
        }  else if (name === "강서구") {
            fillColor = '#E20000'; // Blue for 은평구
        }  else if (name === "구로구") {
            fillColor = '#D80000'; // Blue for 은평구
        }  else if (name === "금천구") {
            fillColor = '#CE0000'; // Blue for 은평구
        }  else if (name === "영등포구") {
            fillColor = '#BC0000'; // Blue for 은평구
        }  else if (name === "동작구") {
            fillColor = '#F4C6C6'; // Blue for 은평구
        }  else if (name === "관악구") {
            fillColor = '#AD0000'; // Blue for 은평구
        }  else if (name === "서초구") {
            fillColor = '#E00000'; // Blue for 은평구
        }  else if (name === "강남구") {
            fillColor = '#990000'; // Blue for 은평구
        }  else if (name === "송파구") {
            fillColor = '#AA0000'; // Blue for 은평구
        }  else if (name === "강동구") {
            fillColor = '#A50000'; // Blue for 은평구
        }
    } else if(count1 == 3) {
        if (name === "종로구") {
            fillColor = '#CE0000'; // Red for 강서구
        } else if (name === "중구") {
            fillColor = '#D30000'; // Blue for 은평구
        } else if (name === "용산구") {
            fillColor = '#AA0000'; // Blue for 은평구
        }  else if (name === "성동구") {
            fillColor = '#F4C6C6'; // Blue for 은평구
        }  else if (name === "광진구") {
            fillColor = '#AD0000'; // Blue for 은평구
        }  else if (name === "동대문구") {
            fillColor = '#F95959'; // Blue for 은평구
        }  else if (name === "중랑구") {
            fillColor = '#F20000'; // Blue for 은평구
        }  else if (name === "성북구") {
            fillColor = '#EF2828'; // Blue for 은평구
        }  else if (name === "강북구") {
            fillColor = '#E20000'; // Blue for 은평구
        }  else if (name === "도봉구") {
            fillColor = '#FFC1C1'; // Blue for 은평구
        }  else if (name === "노원구") {
            fillColor = '#E00000'; // Blue for 은평구
        }  else if (name === "은평구") {
            fillColor = '#D80000'; // Blue for 은평구
        }  else if (name === "서대문구") {
            fillColor = '#EA0000'; // Blue for 은평구
        }  else if (name === "마포구") {
            fillColor = '#750000'; // Blue for 은평구
        }  else if (name === "양천구") {
            fillColor = '#FFA3A3'; // Blue for 은평구
        }  else if (name === "강서구") {
            fillColor = '#A50000'; // Blue for 은평구
        }  else if (name === "구로구") {
            fillColor = '#C10000'; // Blue for 은평구
        }  else if (name === "금천구") {
            fillColor = '#F78888'; // Blue for 은평구
        }  else if (name === "영등포구") {
            fillColor = '#900000'; // Blue for 은평구
        }  else if (name === "동작구") {
            fillColor = '#BC0000'; // Blue for 은평구
        }  else if (name === "관악구") {
            fillColor = '#820000'; // Blue for 은평구
        }  else if (name === "서초구") {
            fillColor = '#6D0000'; // Blue for 은평구
        }  else if (name === "강남구") {
            fillColor = '#660000'; // Blue for 은평구
        }  else if (name === "송파구") {
            fillColor = '#990000'; // Blue for 은평구
        }  else if (name === "강동구") {
            fillColor = '#ED0000'; // Blue for 은평구
        }
    } else if(count1 == 4) {
        if (name === "종로구") {
            fillColor = '#EA0000'; // Red for 강서구
        } else if (name === "중구") {
            fillColor = '#BC0000'; // Blue for 은평구
        } else if (name === "용산구") {
            fillColor = '#F78888'; // Blue for 은평구
        }  else if (name === "성동구") {
            fillColor = '#F4C6C6'; // Blue for 은평구
        }  else if (name === "광진구") {
            fillColor = '#AA0000'; // Blue for 은평구
        }  else if (name === "동대문구") {
            fillColor = '#D30000'; // Blue for 은평구
        }  else if (name === "중랑구") {
            fillColor = '#CE0000'; // Blue for 은평구
        }  else if (name === "성북구") {
            fillColor = '#F95959'; // Blue for 은평구
        }  else if (name === "강북구") {
            fillColor = '#FFC1C1'; // Blue for 은평구
        }  else if (name === "도봉구") {
            fillColor = '#FFC1C1'; // Blue for 은평구
        }  else if (name === "노원구") {
            fillColor = '#E00000'; // Blue for 은평구
        }  else if (name === "은평구") {
            fillColor = '#E20000'; // Blue for 은평구
        }  else if (name === "서대문구") {
            fillColor = '#F20000'; // Blue for 은평구
        }  else if (name === "마포구") {
            fillColor = '#A50000'; // Blue for 은평구
        }  else if (name === "양천구") {
            fillColor = '#D80000'; // Blue for 은평구
        }  else if (name === "강서구") {
            fillColor = '#990000'; // Blue for 은평구
        }  else if (name === "구로구") {
            fillColor = '#AD0000'; // Blue for 은평구
        }  else if (name === "금천구") {
            fillColor = '#EF2828'; // Blue for 은평구
        }  else if (name === "영등포구") {
            fillColor = '#750000'; // Blue for 은평구
        }  else if (name === "동작구") {
            fillColor = '#ED0000'; // Blue for 은평구
        }  else if (name === "관악구") {
            fillColor = '#820000'; // Blue for 은평구
        }  else if (name === "서초구") {
            fillColor = '#900000'; // Blue for 은평구
        }  else if (name === "강남구") {
            fillColor = '#660000'; // Blue for 은평구
        }  else if (name === "송파구") {
            fillColor = '#6D0000'; // Blue for 은평구
        }  else if (name === "강동구") {
            fillColor = '#C10000'; // Blue for 은평구
        }
    } else if(count1 == 5) {
        if (name === "종로구") {
            fillColor = '#E00000'; // Red for 강서구
        } else if (name === "중구") {
            fillColor = '#E20000'; // Blue for 은평구
        } else if (name === "용산구") {
            fillColor = '#EA0000'; // Blue for 은평구
        }  else if (name === "성동구") {
            fillColor = '#FFA3A3'; // Blue for 은평구
        }  else if (name === "광진구") {
            fillColor = '#ED0000'; // Blue for 은평구
        }  else if (name === "동대문구") {
            fillColor = '#D80000'; // Blue for 은평구
        }  else if (name === "중랑구") {
            fillColor = '#AD0000'; // Blue for 은평구
        }  else if (name === "성북구") {
            fillColor = '#F78888'; // Blue for 은평구
        }  else if (name === "강북구") {
            fillColor = '#D30000'; // Blue for 은평구
        }  else if (name === "도봉구") {
            fillColor = '#FFC1C1'; // Blue for 은평구
        }  else if (name === "노원구") {
            fillColor = '#AA0000'; // Blue for 은평구
        }  else if (name === "은평구") {
            fillColor = '#CE0000'; // Blue for 은평구
        }  else if (name === "서대문구") {
            fillColor = '#F4C6C6'; // Blue for 은평구
        }  else if (name === "마포구") {
            fillColor = '#BC0000'; // Blue for 은평구
        }  else if (name === "양천구") {
            fillColor = '#F20000'; // Blue for 은평구
        }  else if (name === "강서구") {
            fillColor = '#900000'; // Blue for 은평구
        }  else if (name === "구로구") {
            fillColor = '#990000'; // Blue for 은평구
        }  else if (name === "금천구") {
            fillColor = '#EF2828'; // Blue for 은평구
        }  else if (name === "영등포구") {
            fillColor = '#6D0000'; // Blue for 은평구
        }  else if (name === "동작구") {
            fillColor = '#F95959'; // Blue for 은평구
        }  else if (name === "관악구") {
            fillColor = '#820000'; // Blue for 은평구
        }  else if (name === "서초구") {
            fillColor = '#A50000'; // Blue for 은평구
        }  else if (name === "강남구") {
            fillColor = '#660000'; // Blue for 은평구
        }  else if (name === "송파구") {
            fillColor = '#750000'; // Blue for 은평구
        }  else if (name === "강동구") {
            fillColor = '#C10000'; // Blue for 은평구
        }
    }



    var polygon = new daum.maps.Polygon({
        map: map, // 다각형을 표시할 지도 객체
        path: path,
        strokeWeight: 2,
        strokeColor: '#004c80',
        strokeOpacity: 0.8,
        fillColor: fillColor,
        fillOpacity: fillOpacity
    });



    polygons.push(polygon);
    polygon.setMap(map);

    // 폴리곤의 중심 좌표를 계산하여 구역 이름을 표시할 위치로 설정
    var centroidPoint = centroid(points);

    // 폴리곤의 이름을 표시하는 커스텀 오버레이를 생성하고 지도에 추가
// 폰트 크기를 조절할 수 있는 스타일을 추가합니다
    var customOverlay = new daum.maps.CustomOverlay({
        content: '<div class="area-name" style="font-size: 5px;">' + name + '</div>', // 여기에서 폰트 크기를 조절
        map: map,
        position: new daum.maps.LatLng(centroidPoint.x, centroidPoint.y),
    });

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
        polygon.setOptions({fillColor: '#FF0000'});
        if(count === 0) {
            customOverlay.setContent('<div class="area-name0" style="font-size: 30px;">' + name + '</div>');
        }else if(count == 1){
            //console.log(count);
            customOverlay.setContent('<div class="area-name1" style="font-size: 30px;">' + name + '</div>')
        } else if(count == 2) {
            customOverlay.setContent('<div class="area-name2" style="font-size: 30px;">' + name + '</div>')

        }


        customOverlay.setPosition(mouseEvent.latLng);
        //customOverlay.setMap(map);
    });


    
    // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
    // 커스텀 오버레이를 지도에서 제거합니다
    kakao.maps.event.addListener(polygon, 'mouseout', function() {
        polygon.setOptions({fillColor: fillColor});
        customOverlay.setMap(null);
    });

    // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
    kakao.maps.event.addListener(polygon, 'click', function(mouseEvent) {
        // 현재 지도 레벨에서 2레벨 확대한 레벨
        var level = map.getLevel()-4;
        //console.log(level);
        // 지도를 클릭된 폴리곤의 중앙 위치를 기준으로 확대합니다
        map.setLevel(level, {anchor: centroid(points), animate: {
                duration: 350            //확대 애니메이션 시간
            }});

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

