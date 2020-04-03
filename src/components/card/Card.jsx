import React from "react";
import "./Card.scss";
import moment from "moment";

const Card = props => {
  const { trip, OnClick } = props;

  const date =
    moment(trip.startTime).format("HH:mm") +
    " hrs " +
    moment(trip.startTime).format("DD/MM/YYYY");

  return (
    <div className="card" onClick={() => OnClick(trip)}>
      <h1 className="drivername">{trip.driverName}</h1>
      <p>{trip.status}</p>
      <p>{trip.description}</p>
      <p>{date}</p>
    </div>
  );
};

export default Card;
