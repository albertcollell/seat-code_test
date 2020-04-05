import React from "react";
import Card from "../card/Card.jsx";
import "./Column.scss";

const Column = props => {
  const { trips, OnClick } = props;

  // Creates a card for each trip that that exist.

  return (
    <div className="column-layout">
      {trips.map((x, i) => (
        <Card key={i} trip={x} OnClick={OnClick} />
      ))}
    </div>
  );
};

export default Column;
