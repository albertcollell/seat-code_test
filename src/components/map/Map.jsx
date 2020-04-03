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
import moment from "moment";

const Map = props => {
  const { selected } = props;

  const [stop, setStop] = useState([]);
  const [infoOpen, setInfoOpen] = useState(false);

  let centerMap = { lat: 41.2851, lng: 2.1734 };

  const centerMapChange = points => {
    let newLatitude = (points[0].lat + points[points.length - 1].lat) / 2;
    let newLongitude = (points[0].lng + points[points.length - 1].lng) / 2;
    return { lat: newLatitude, lng: newLongitude };
  };

  const changeCord = x => {
    return { lat: x._latitude, lng: x._longitude };
  };

  const display = () => {
    const decodePolyline = require("decode-google-map-polyline");
    const routeDecoded = decodePolyline(selected.route);
    centerMapChange(routeDecoded);

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
          selected.stops.map(x => (
            <Marker
              icon={IconYellow}
              onClick={() => showStopInfo(x.id)}
              position={changeCord(x.point)}
            >
              {console.log(x.id)}
            </Marker>
          ))}
        ;
        {infoOpen && stop.point && (
          <InfoWindow
            onCloseClick={() => setInfoOpen(false)}
            position={changeCord(stop.point)}
          >
            <div>
              <p>{stop.userName}</p>
              <p>{stop.address}</p>
              <p>{moment(stop.stopTime).format("HH:mm")}</p>
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
          {selected && display()}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
