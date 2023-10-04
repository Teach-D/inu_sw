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


document.addEventListener("DOMContentLoaded", function () {
    // 팝업 창 열기
    function openPopup() {
        document.getElementById("myPopup").style.display = "block";
    }

    // 팝업 창 닫기
    function closePopup() {
        document.getElementById("myPopup").style.display = "none";
    }

    // 메뉴 3 클릭 시 팝업 열기
    const menuLink3 = document.querySelector(".main__menu li:nth-child(2) a"); // 4번째 메뉴 아이템 (인덱스 0부터 시작)

    menuLink3.addEventListener("click", function (event) {
        event.preventDefault(); // 링크 기본 동작 제거
        openPopup(); // 팝업 열기
    });

    // 닫기 버튼 클릭 시 팝업 닫기
    document.getElementById("closePopup").addEventListener("click", function () {
        closePopup(); // 팝업 닫기
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById('map');
    var options = {
        // 서울시 중심 좌표 설정
        center: new kakao.maps.LatLng(37.566826, 126.978656),
        // 서울시 영역의 좌표 범위 설정
        range: [ // 좌측 상단, 우측 하단 좌표 설정
            new kakao.maps.LatLng(37.438, 126.764), // 서울시 서쪽 상단 좌표
            new kakao.maps.LatLng(37.634, 127.183)  // 서울시 동쪽 하단 좌표
        ]
    };
    var map = new kakao.maps.Map(container, options);
    
});

// 마커 클러스터 표시 
var map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
    center : new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
    level : 14 // 지도의 확대 레벨
});

// 마커 클러스터러를 생성합니다
// 마커 클러스터러를 생성할 때 disableClickZoom 값을 true로 지정하지 않은 경우
// 클러스터 마커를 클릭했을 때 클러스터 객체가 포함하는 마커들이 모두 잘 보이도록 지도의 레벨과 영역을 변경합니다
// 이 예제에서는 disableClickZoom 값을 true로 설정하여 기본 클릭 동작을 막고
// 클러스터 마커를 클릭했을 때 클릭된 클러스터 마커의 위치를 기준으로 지도를 1레벨씩 확대합니다
var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 10, // 클러스터 할 최소 지도 레벨
    disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
});

// 데이터를 가져오기 위해 jQuery를 사용합니다
// 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
$.get("/download/web/data/chicken.json", function(data) {
    // 데이터에서 좌표 값을 가지고 마커를 표시합니다
    // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
    var markers = $(data.positions).map(function(i, position) {
        return new kakao.maps.Marker({
            position : new kakao.maps.LatLng(position.lat, position.lng)
        });
    });

    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);
});

// 마커 클러스터러에 클릭이벤트를 등록합니다
// 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
// 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {

    // 현재 지도 레벨에서 1레벨 확대한 레벨
    var level = map.getLevel()-1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, {anchor: cluster.getCenter()});
});