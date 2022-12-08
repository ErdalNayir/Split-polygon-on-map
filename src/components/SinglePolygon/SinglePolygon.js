import React, { useState } from "react";
import { Geojson } from "react-native-maps";

function SinglePolygon({ data }) {
  const [color, setColorHeatMap] = useState(0.8);

  function onPressHandler() {
    if (color > 0.05) {
      console.log("Basıldı " + data.id);
      setColorHeatMap(color - 0.05);
    }
  }

  return (
    <Geojson
      tappable
      onPress={onPressHandler}
      geojson={data}
      strokeColor={"rgba(0,0,0,0.5)"}
      fillColor={`rgba(0, 0, 0, ${color})`}
      strokeWidth={2}
    />
  );
}

export default React.memo(SinglePolygon);

