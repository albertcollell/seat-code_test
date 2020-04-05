import React, { useEffect, useState } from "react";
import "./App.scss";
import { getTrips } from "./shared/shared.jsx";
import Column from "./components/column/Column";
import Map from "./components/map/Map";

export const App = () => {
  const [trips, setTrips] = useState([]);
  const [selected, setSelected] = useState();

  // Calls the Trips once we start the Web App
  useEffect(() => {
    getTrips().then(response => setTrips(response.data));
  }, []);

  // It change the state of the selected trip (is sended to the Card as a prop)
  const OnClick = trip => {
    setSelected(trip);
  };

  return (
    <div className="App">
      {trips.length === 0 ? (
        <p className="loading">LOADING....</p>
      ) : (
        <Column trips={trips} OnClick={OnClick} />
      )}
      <Map selected={selected} />
    </div>
  );
};

export default App;
