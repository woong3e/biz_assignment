import React, { useEffect, useState, useRef } from "react";
import { Flex, Button } from "@chakra-ui/react";
const Marker = () => {
  const [flow, setFlow] = useState([]);
  const { naver } = window;
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [markerState, setMarkerState] = useState([]);

  const markerColor = {
    1: "https://github.com/woong3e/biz_assignment/blob/master/src/images/a.png",
    2: "https://github.com/woong3e/biz_assignment/blob/master/src/images/b.png",
    3: "https://github.com/woong3e/biz_assignment/blob/master/src/images/c.png",
    4: "https://github.com/woong3e/biz_assignment/blob/master/src/images/d.png",
    5: "https://github.com/woong3e/biz_assignment/blob/master/src/images/e.png",
  };

  useEffect(() => {
    fetch("/data/flowpop.json")
      .then((res) => res.json())
      .then((data) => setFlow(data));
  }, []);

  useEffect(() => {
    //1. 지도 옵션 설정
    const mapOptions = {
      center: new naver.maps.LatLng(37.5739662, 126.9883924),
      zoom: 17,
    };
    //2. 지도 생성, 첫번째 인수는 container요소, 두번째 인수는 mapOptions, 생성된 지도는 mapRef.current에 담아준다.
    mapRef.current = new naver.maps.Map("map", mapOptions);
  }, []);

  useEffect(() => {
    if (!mapRef.current || !flow) return;
    //3. Marker
    let markers = [];
    for (let i = 0; i < flow.length; i++) {
      if (flow[i].flowLv !== 5) {
        continue;
      }
      markers.push(
        new naver.maps.Marker({
          map: mapRef.current,
          position: new naver.maps.LatLng(flow[i].yAxis, flow[i].xAxis),
          icon: {
            url: markerColor[flow[i].flowLv],
            size: new naver.maps.Size(5, 5),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(11, 35),
          },
        })
      );
    }
    setMarkerState(markers);
  }, [flow, mapRef]);

  useEffect(() => {
    //5. idle 이벤트
    naver.maps.Event.addListener(mapRef.current, "idle", function () {
      updateMarkers(mapRef.current, markerState); //줌하거나 패닝시 이벤트동작
    });
  }, [markerState]);

  const showMarker = (map, marker) => {
    if (marker.getMap()) return;
    marker.setMap(map);
  };

  const hideMarker = (map, marker) => {
    if (!marker.getMap()) return;
    marker.setMap(null);
  };

  const updateMarkers = (map, markerState) => {
    const mapBounds = map.getBounds();
    let marker;
    let position;

    for (let i = 0; i < markerState.length; i++) {
      marker = markerState[i];
      position = marker.getPosition();

      if (mapBounds.hasLatLng(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(map, marker);
      }
    }
  };

  //버튼 필터링
  const handleClickButton = () => {
    let markers = [];
    for (let i = 0; i < flow.length; i++) {
      if (flow[i].flowLv !== 4) {
        continue;
      }

      markers.push(
        new naver.maps.Marker({
          map: mapRef.current,
          position: new naver.maps.LatLng(flow[i].yAxis, flow[i].xAxis),
          icon: {
            url: markerColor[flow[i].flowLv],
            size: new naver.maps.Size(5, 5),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(11, 35),
          },
        })
      );
    }
    setMarkerState(markers);
  };
  const handleClickButton123 = () => {
    let markers = [];
    for (let i = 0; i < flow.length; i++) {
      if (flow[i].flowLv === 4 || flow[i].flowLv === 5) {
        continue;
      }
      markers.push(
        new naver.maps.Marker({
          map: mapRef.current,
          position: new naver.maps.LatLng(flow[i].yAxis, flow[i].xAxis),
          icon: {
            url: markerColor[flow[i].flowLv],
            size: new naver.maps.Size(5, 5),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(11, 35),
          },
        })
      );
    }
    setMarkerState(markers);
  };
  return (
    <Flex id="map" w="100%" h="100vh" justify="center" align="center">
      <Button
        zIndex={10}
        position="absolute"
        top={0}
        right={0}
        onClick={handleClickButton}
      >
        4 추가
      </Button>
      <Button
        zIndex={10}
        position="absolute"
        top={10}
        right={0}
        onClick={() => {
          handleClickButton123();
        }}
      >
        1,2,3 추가
      </Button>
    </Flex>
  );
};

export default Marker;
