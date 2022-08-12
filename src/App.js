import React, { useRef, useEffect, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const Map = new ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

function App() {

  const onDrawCreate = ({ features }) => {
    console.log(features);
  };

  const onDrawUpdate = ({ features }) => {
    console.log(features);
  };

  

  return (
    <div>
      <div className="sidebar">
        Longitude: "lng" | Latitude: "lat" | Zoom: "zoom"
      </div>
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <DrawControl/>
      </Map>
      <div className="calculation-box">
        <p>Click the map to draw a polygon.</p>
        <div id="calculated-area"></div>
      </div>
    </div>
  );
}

export default App;
