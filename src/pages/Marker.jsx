import React, { useEffect, useState, useRef } from "react";
import { Box, Flex, Button, ButtonGroup } from "@chakra-ui/react";
const Marker = () => {
  const [flow, setFlow] = useState([]);
  const { naver } = window;
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [markers, setMarkers] = useState({});
  const markerColor = {
    1: "src/img/1.png",
    2: "src/img/2.png",
    3: "src/img/3.png",
    4: "src/img/4.png",
    5: "src/img/5.png",
  };
  // const markerColor2 = {
  //   1: "#0000ff",
  //   2: "#00ff00",
  //   3: "#fff200",
  //   4: "#ff9500",
  //   5: "#ff0000",
  // };

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
    for (let i = 0; i < flow.length; i++) {
      if (
        flow[i].flowLv === 1 ||
        flow[i].flowLv === 2 ||
        flow[i].flowLv === 3 ||
        flow[i].flowLv === 4
      ) {
        continue;
      }
      setMarkers(
        new naver.maps.Marker({
          map: mapRef.current,
          position: new naver.maps.LatLng(flow[i].yAxis, flow[i].xAxis),
          icon: {
            // content: `<div style={width:5px;height:5px;border-radius:50%;background-color:${
            //   markerColor2[flow[i].flowLv]
            // }}></div>`,
            url: markerColor[flow[i].flowLv],
            // url: `src/img/${flow[i].flowLv}.png`,
            size: new naver.maps.Size(5, 5),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(11, 35),
          },
        })
      );
    }
  }, [flow, mapRef]);
  const handleClickButton = () => {
    for (let i = 0; i < flow.length; i++) {
      if (
        flow[i].flowLv === 1 ||
        flow[i].flowLv === 2 ||
        flow[i].flowLv === 3 ||
        flow[i].flowLv === 5
      ) {
        continue;
      }
      setMarkers(
        new naver.maps.Marker({
          map: mapRef.current,
          position: new naver.maps.LatLng(flow[i].yAxis, flow[i].xAxis),
          icon: {
            // content: `<div style={width:5px;height:5px;border-radius:50%;background-color:${
            //   markerColor2[flow[i].flowLv]
            // }}></div>`,
            url: markerColor[flow[i].flowLv],
            // url: `src/img/${flow[i].flowLv}.png`,
            size: new naver.maps.Size(5, 5),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(11, 35),
          },
        })
      );
    }
  };
  const handleClickButton2 = () => {
    for (let i = 0; i < flow.length; i++) {
      if (flow[i].flowLv === 4 || flow[i].flowLv === 5) {
        continue;
      }
      setMarkers(
        new naver.maps.Marker({
          map: mapRef.current,
          position: new naver.maps.LatLng(flow[i].yAxis, flow[i].xAxis),
          icon: {
            // content: `<div style={width:5px;height:5px;border-radius:50%;background-color:${
            //   markerColor2[flow[i].flowLv]
            // }}></div>`,
            url: markerColor[flow[i].flowLv],
            // url: `src/img/${flow[i].flowLv}.png`,
            size: new naver.maps.Size(5, 5),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(11, 35),
          },
        })
      );
    }
  };
  console.log(Array.isArray(markers));
  return (
    <div>
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
          onClick={handleClickButton2}
        >
          1,2,3 추가
        </Button>
      </Flex>
    </div>
  );
};

export default Marker;
