import React, { useState } from "react";
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
  const [centerMap, setCenterMap] = useState({ lat: 41.2851, lng: 2.1734 });
  const [zoomMap, setZoomMap] = useState(6);

  // Takes the route of the trip and centers the map on that particular trip, uses the start and end positions.
  const CenterMap = route => {
    const newCenterLat = +(
      (route[0].lat + route[route.length - 1].lat) /
      2
    ).toFixed(4);
    const newCenterLng = +(
      (route[0].lng + route[route.length - 1].lng) /
      2
    ).toFixed(4);

    newCenterLat !== centerMap.lat &&
      setCenterMap({ lat: newCenterLat, lng: newCenterLng });

    newCenterLat !== centerMap.lat && setZoomMap(11);
  };

  // changes the coordinates object keys
  const ChangeCord = x => {
    return { lat: x._latitude, lng: x._longitude };
  };

  // Displays the route and the markers
  const DisplayRoutes = () => {
    const decodePolyline = require("decode-google-map-polyline");
    const routeDecoded = decodePolyline(selected.route);

    CenterMap(routeDecoded);

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
              <p className="username">{stop.userName}</p>
              <p className="address">{stop.address}</p>
              <p className="time">{Moment(stop.stopTime).format("HH:mm")}</p>
              <p className="status">{stop.paid ? "Paid" : "Non-paid"}</p>
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
          zoom={zoomMap}
        >
          {/*  If there is a trip selected it displays it */}
          {selected && DisplayRoutes()}{" "}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
