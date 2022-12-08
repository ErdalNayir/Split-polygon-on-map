import React, { useState } from "react";
import MapView, { Geojson } from "react-native-maps";
import { initialRegion } from "../../utils/data";
import PolygonArea from "../PolygonArea";
import styles from "./MainMapStyle";
import CustomHeatMap from "../HeatMap/heatMap";
import { geoJsonOfUniversity } from "../../utils/data";

//Bu bileşen ekranda görünen haritayı oluşturur. 
function MainMap() {
  const [region, setRegion] = useState(initialRegion);

  function onRegionChange(region) {
    setRegion({ region });
  }

  return (
    <MapView style={styles.map} region={region} onRegionChange={onRegionChange}>
      {/* <PolygonArea></PolygonArea>
      <CustomHeatMap></CustomHeatMap> */}
      {/* <Geojson geojson={geoJsonOfUniversity} fillColor={"rgba(0,255,0,0.1)"} /> */}
      <PolygonArea></PolygonArea>
    </MapView>
  );
}

export default MainMap;
