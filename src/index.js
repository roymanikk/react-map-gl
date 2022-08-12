import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import * as turf from "@turf/turf";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./index.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g",
});

function App() {
  const [geoData, setGeoData] = useState([]);

  const onDrawCreate = ({ features }) => {
    console.log("feature:", features);
    setGeoData((oldValue) => [...oldValue, features[0]]);
  };

  const onDrawUpdate = ({ features }) => {
    Object.values(features).map((feature) => {
      setGeoData((oldValue) =>
        oldValue.map((e) => (e.id === feature.id ? feature : e))
      );
    });
  };

  const onDelete = ({ features }) => {
    Object.values(features).map((feature) => {
      setGeoData((oldValue) => oldValue.filter((e) => e.id !== feature.id));
    });
  };

  useEffect(() => {
    console.log(geoData.length);
    console.log(geoData);
  }, [geoData]);

  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <DrawControl
          displayControlsDefault={false}
          controls={{ polygon: true, line_string: true, trash: true }}
          onDrawCreate={onDrawCreate}
          onDrawUpdate={onDrawUpdate}
          onDrawDelete={onDelete}
        />
      </Map>
      <div className="calculation-box">
        <p>Click the map to draw a shape.</p>
        <div id="calculated-area"></div>
      </div>
      <div style={{ border: "1px solid black",marginTop: "1rem" }} >
        {geoData &&
          geoData.map((item) => <p key={item.id}>{JSON.stringify(item)}</p>)}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
