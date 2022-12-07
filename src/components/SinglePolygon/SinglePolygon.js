import { centroid } from "@turf/turf";
import React from "react";
import { Geojson } from "react-native-maps";
import { centerOfPolygon } from "../../utils/mapCalculations";

const colors = ["#1c1c1c", "#232323", "#4f4d4d", "#5e5e5e","#666464","#7c7b7b","cccccc"];
var color0 = "#1c1c1c", color1 = "#1c1c1c", color2 = "#1c1c1c", color3 = "#1c1c1c", color4 = "#1c1c1c"; 
let count0=0,count1=0,count2=0,count3=0,count4=0;

function SinglePolygon({ data }) {
  function onPressHandler() {
    console.log("Basıldı " + data.id);
    setColor(data.id);
  }
  function setColor(id) {
    if(id===0){
      count0+=1;
      color0=colors[count0];
    }
    else if(id===1){
      count1+=1;
      color1=colors[count1];
    }
    else if(id===2){
      count2+=1;
      color2=colors[count2];
    }
    else if(id===3){
      count3+=1;
      color3=colors[count3];
      
    }
    else if(id===4){
      count4+=1;
      color4=colors[count4];
    }
  }

  if (data.id === 0) {
    return (
      <Geojson
        tappable
        onPress={onPressHandler}
        geojson={data}
        strokeColor={"rgba(0,0,0,0.25)"}
        fillColor={color0}

        strokeWidth={2}
      />
    );
  }
  else if (data.id === 1) {
    return (
      <Geojson
        tappable
        onPress={onPressHandler}
        geojson={data}
        strokeColor={"rgba(0,25,0,0.25)"}
        fillColor={color1}

        strokeWidth={2}
      />
    );
  }
  else if (data.id === 2) {
    return (
      <Geojson
        tappable
        onPress={onPressHandler}
        geojson={data}
        strokeColor={"rgba(0,0,0,0.25)"}
        fillColor={color2}

        strokeWidth={2}
      />
    );
  }
  else if (data.id === 3) {
    return (
      <Geojson
        tappable
        onPress={onPressHandler}
        geojson={data}
        strokeColor={"rgba(0,0,0,0.25)"}
        fillColor={color3}

        strokeWidth={2}
      />
    );
  }
  else if (data.id === 4) {
    return (
      <Geojson
        tappable
        onPress={onPressHandler}
        geojson={data}
        strokeColor={"rgba(0,0,0,0.25)"}
        fillColor={color4}

        strokeWidth={2}
      />
    );
  }
}

export default React.memo(SinglePolygon);
