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

export const centerOfPolygon = () => {
  //Find center of polygon
  var polygonArea = polygon(getCoordinates());
  var center = centerOfMass(polygonArea);

  // result will be returned as an object
  return {
    longitude: center["geometry"]["coordinates"][0],
    latitude: center["geometry"]["coordinates"][1],
  };
};

// export const eliminateOutliner = (data) => {
//   var bboxArea = bbox(data);
//   var lowerPoint = [bboxArea[0], bboxArea[1]];
//   var upperPoint = [bboxArea[2], bboxArea[3]];

//   var result = createGeoJsonPolygon();

//   testData["features"].forEach((data) => {
//     var pass = 0;
//     for (var i = 0; i < 4; i++) {
//       var curr = data["geometry"]["coordinates"][0][i];

//       if (
//         curr[0] >= lowerPoint[0] &&
//         curr[0] <= upperPoint[0] &&
//         curr[1] >= lowerPoint[1] &&
//         curr[1] <= upperPoint[1]
//       ) {
//         pass++;
//       }
//     }
//     if (pass == 4) {
//       result["features"].push(data);
//     }
//   });
//   return result;
// };

//FOR HEATMAP
export const createWeightedPoints = () => {
  var weightedPoints = [];

  var geoData = eliminateOutliner(geoJsonOfUniversity);

  geoData["features"].forEach((data) => {
    var polygonPart = polygon(data["geometry"]["coordinates"]);
    var centerOfPart = centerOfMass(polygonPart);

    var randomWeight = Math.floor(Math.random() * (50 - 5 + 1)) + 5;

    var tempRes = {
      longitude: centerOfPart["geometry"]["coordinates"][0],
      latitude: centerOfPart["geometry"]["coordinates"][1],
      weight: randomWeight,
    };

    weightedPoints.push(tempRes);
  });
  return weightedPoints;
};

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

//createRandomPoint();

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
