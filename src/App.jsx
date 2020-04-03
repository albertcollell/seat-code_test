import React, { useEffect, useState } from "react";
import "./App.scss";
import { getTrips } from "./shared/shared.jsx";
import Column from "./components/column/Column";
import Map from "./components/map/Map";

export const App = () => {
  const [trips, setTrips] = useState([]);
  const [selected, setSelected] = useState();

  const OnClick = id => {
    setSelected(id);
  };

  useEffect(() => {
    getTrips().then(response => setTrips(response.data));
  }, []);

  return (
    <div className="App">
      {trips.length == 0 ? (
        <a>LOADING....</a>
      ) : (
        <Column trips={trips} OnClick={OnClick} />
      )}
      <Map selected={selected} />
    </div>
  );
};

export default App;
