import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import getTrips from "./shared/shared.jsx";

export const App = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips().then(response => setTrips(response.data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {trips.length == 0 ? (
          <a>NOTHING</a>
        ) : (
          trips.map(x => <li>{x.driverName}</li>)
        )}
      </header>
    </div>
  );
};

export default App;
