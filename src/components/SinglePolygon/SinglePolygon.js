import React from "react";
import { Geojson } from "react-native-maps";

function SinglePolygon({ data }) {
  function onPressHandler() {
    console.log("Basıldı");
  }

  return (
    <Geojson
      tappable
      onPress={onPressHandler}
      geojson={data}
      strokeColor={"rgba(0,0,0,0.25)"}
      fillColor={"rgba(0,255,0,0.1)"}
      strokeWidth={2}
    />
  );
}

export default React.memo(SinglePolygon);
