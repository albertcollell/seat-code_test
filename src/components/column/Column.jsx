import React from "react";
import Card from "../card/Card.jsx";
import "./Column.scss";

const Column = props => {
  const { trips, OnClick } = props;
  return (
    <div className="column-layout">
      {trips.map(x => (
        <Card trip={x} OnClick={OnClick} />
      ))}
    </div>
  );
};

export default Column;
