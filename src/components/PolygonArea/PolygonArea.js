import React from "react";
import { clippedVoronois } from "../../utils/data";
import { createGeoJsonPolygon } from "../../utils/dataParser";
import SinglePolygon from "../SinglePolygon/SinglePolygon";

function PolygonArea() {
  return clippedVoronois["features"].map((data, index) => {
    var coordinates = data["geometry"]["coordinates"];
    var id = data.id;
    var polygonData = createGeoJsonPolygon(coordinates, id);
    return <SinglePolygon key={index} data={polygonData}></SinglePolygon>;
  });
}

export default PolygonArea;
