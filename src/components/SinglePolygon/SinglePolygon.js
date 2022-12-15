//Her alt polygonun cizildigi bilesendir
import React, { useState } from "react";
import { Geojson } from "react-native-maps";

function SinglePolygon({ data,hue }) {
  const [color, setColorHeatMap] = useState(hue);

  //Alt poligona tıklanınca yapılması gerekenler bu fonksiyonda belirtildi
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

