import {
  centerOfMass,
  bbox,
  polygon,
  randomPoint,
  clustersKmeans,
  centroid,
  voronoi,
  intersect,
} from "@turf/turf";
import { geoJsonOfUniversity, testData } from "./data";
import { getCoordinates, createGeoJsonPolygon } from "./dataParser";


//FOR ONE TIME USE
export const createRandomPoint = () => {
  var points = randomPoint(200, {
    bbox: [
      29.127645217731043, 40.1862723927386, 29.13246467634937,
      40.19142047840003,
    ],
  });

  // var jsonData = JSON.stringify(points);
  // console.log(jsonData);

  return points;
};

export const createSplitPolygon = () => {
  var polygonBbox = bbox(geoJsonOfUniversity); //CREATE BBOX OF GEOJSON DATA

  var randomPoints = createRandomPoint();

  var centroids = []; //CENTROID WILL BE STORED HERE

  var clusters = clustersKmeans(randomPoints, { numberOfClusters: 7 }); //5 CLUSTER WILL HAVE CREATED

  //Splitting points by cluster
  const clusterGroups = {};
  clusters.features.forEach((feature) => {
    if (!clusterGroups.hasOwnProperty(feature.properties.cluster)) {
      clusterGroups[feature.properties.cluster] = [];
    }
    clusterGroups[feature.properties.cluster].push(feature);
  });

  //CREATE CENTROIDS
  Object.keys(clusterGroups).forEach((i) => {
    const features = clusterGroups[i];
    const centroidData = centroid({
      type: "FeatureCollection",
      features: features,
    });
    centroids.push(centroidData);
  });

  //VORONOI
  var voronoiPolygons = voronoi(
    {
      type: "FeatureCollection",
      features: centroids,
    },
    {
      bbox: polygonBbox,
    }
  );

  //CLIP UNWANTED PARTS OF VORONOI
  const clippedVoronoi = voronoiPolygons.features.map((feature) => {
    return intersect(
      feature.geometry,
      geoJsonOfUniversity.features[0].geometry
    );
  });
  console.log(JSON.stringify(clippedVoronoi));
};
//createSplitPolygon();

export const intersectPolygons = () => {
  const clippedData = testData.features.map((feature) => {
    return intersect(
      feature.geometry,
      geoJsonOfUniversity.features[0].geometry
    );
  });

  console.log(JSON.stringify(clippedData));
};
//intersectPolygons();
