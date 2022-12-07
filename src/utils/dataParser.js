import { geoJsonOfUniversity } from "./data";

export const getCoordinates = () => {
  return geoJsonOfUniversity["features"][0]["geometry"]["coordinates"];
};

export const createGeoJsonPolygon = (data, id) => {
  var geojsonPolygon;
  if (data != undefined) {
    geojsonPolygon = {
      type: "FeatureCollection",
      id: id,
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: data,
            type: "Polygon",
          },
        },
      ],
    };
  } else {
    geojsonPolygon = {
      type: "FeatureCollection",
      features: [],
    };
  }

  return geojsonPolygon;
};
