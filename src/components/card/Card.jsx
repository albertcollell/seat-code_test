import React from "react";
import "./Card.scss";
import moment from "moment";

const Card = props => {
  const { trip, OnClick } = props;

  // Changes the date format
  const date =
    moment(trip.startTime).format("HH:mm") +
    " hrs " +
    moment(trip.startTime).format("DD/MM/YYYY");

  return (
    <div className="card" onClick={() => OnClick(trip)}>
      <p className="drivername">{trip.driverName}</p>
      <p className="description">{trip.description}</p>
      <p className="date">{date}</p>
      <p className="tripstatus">{trip.status}</p>
    </div>
  );
};

export default Card;
