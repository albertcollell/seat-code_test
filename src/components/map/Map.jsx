import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import "./Map.scss";
import IconRed from "../../assets/red-dot.png";
import IconGreen from "../../assets/green-dot.png";
import IconYellow from "../../assets/yellow-dot.png";
import { getStop } from "../../shared/shared";
import Moment from "moment";

const Map = props => {
  const { selected } = props;

  const [stop, setStop] = useState([]);
  const [infoOpen, setInfoOpen] = useState(false);

  let centerMap = { lat: 41.2851, lng: 2.1734 };

  const ChangeCord = x => {
    return { lat: x._latitude, lng: x._longitude };
  };

  const DisplayRoutes = () => {
    const decodePolyline = require("decode-google-map-polyline");
    const routeDecoded = decodePolyline(selected.route);
    const showStopInfo = id => {
      getStop(id).then(response => setStop(response.data));
      setInfoOpen(true);
    };

    return (
      <div>
        <Polyline path={routeDecoded} />
        <Marker icon={IconGreen} position={routeDecoded[0]} />
        <Marker
          icon={IconRed}
          position={routeDecoded[routeDecoded.length - 1]}
        />
        {selected.stops.length > 1 &&
          selected.stops.map((x, i) => (
            <Marker
              key={i}
              icon={IconYellow}
              onClick={() => showStopInfo(x.id)}
              position={ChangeCord(x.point)}
            />
          ))}
        ;
        {infoOpen && stop.point && (
          <InfoWindow
            onCloseClick={() => setInfoOpen(false)}
            position={ChangeCord(stop.point)}
          >
            <div>
              <p>{stop.userName}</p>
              <p>{stop.address}</p>
              <p>{Moment(stop.stopTime).format("HH:mm")}</p>
              <p>{stop.paid ? "Paid" : "Non-paid"}</p>
            </div>
          </InfoWindow>
        )}
      </div>
    );
  };

  return (
    <div className="area-map">
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyD1aCwKJ42a5xoT7lk4EEgdHueW0vMY8TA"
      >
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          id="example-map"
          className="map"
          center={centerMap}
          zoom={8}
        >
          {selected && DisplayRoutes()}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
