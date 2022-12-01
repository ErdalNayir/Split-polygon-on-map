import React from "react";
import { clippedVoronois } from "../../utils/data";
import { createGeoJsonPolygon } from "../../utils/dataParser";
import SinglePolygon from "../SinglePolygon/SinglePolygon";
import { clippedTestData } from "../../utils/data";

function PolygonArea() {
  return clippedVoronois["features"].map((data, index) => {
    var coordinates = data["geometry"]["coordinates"];
    var polygonData = createGeoJsonPolygon(coordinates);

    return <SinglePolygon key={index} data={polygonData}></SinglePolygon>;
  });
}

export default PolygonArea;
