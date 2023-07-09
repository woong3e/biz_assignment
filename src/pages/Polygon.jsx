import React from "react";
import { useState, useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";

const Polygon = () => {
  const [where, setWhere] = useState([]);
  const { naver } = window;
  const mapRef = useRef(null);
  // const polygonRef = useRef([]);

  useEffect(() => {
    fetch("/data/sido_test.json")
      .then((res) => res.json())
      .then((data) => setWhere(data));
  }, []);

  useEffect(() => {
    //1. 지도 옵션 설정
    const mapOptions = {
      center: new naver.maps.LatLng(36.4203004, 128.31796),
      zoom: 7,
    };
    //2. 지도 생성, 첫번째 인수는 container요소, 두번째 인수는 mapOptions
    mapRef.current = new naver.maps.Map("map", mapOptions);
    //3. polygon 에제
  }, []);

  useEffect(() => {
    if (!mapRef.current || !where) return;

    const finalPath = [];
    const path = where.map((el) => JSON.parse(el.polygon));
    const newPath = path[0]; //바뀌는 값?
    for (const key in newPath) {
      const newPath3 = Object(newPath[key]);
      const newPath4 = [newPath3[0], newPath3[1]]; //[lat,lng]
      finalPath.push(Object(newPath4));
    }
    const finalMap = finalPath.map((el) => new naver.maps.LatLng(el));

    const polygon = new naver.maps.Polygon({
      map: mapRef.current,
      paths: [finalMap],
      fillColor: "#ff0000",
      fillOpacity: 0.3,
      strokeColor: "#ff0000",
      strokeOpacity: 0.6,
      strokeWeight: 3,
    });
  }, [where, mapRef]);

  return (
    <div>
      <Flex id="map" w="100%" h="80vh" justify="center" align="center" />
      <Flex align="center" justify="center">
        모든 인류 구성원의 천부
      </Flex>
    </div>
  );
};

export default Polygon;
