import React from "react";
import { createWeightedPoints } from "../../utils/mapCalculations";
import { Heatmap } from "react-native-maps";

function CustomHeatMap() {
  const weightedPoints = createWeightedPoints();
  return (
    <Heatmap
      points={weightedPoints}
      radius={40}
      opacity={0.5}
      gradient={{
        colors: ["#ED3422", "#543127", "#8E7367", "#FFE4DC"],
        startPoints:
          Platform.OS === "ios"
            ? [0.01, 0.04, 0.1, 0.45]
            : [0.1, 0.25, 0.5, 0.75],
        colorMapSize: 2000,
      }}></Heatmap>
  );
}

export default CustomHeatMap;
