import axios from "axios";

export const getTrips = () => {
  return axios.get(
    "https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/trips"
  );
};

export const getStop = stopId => {
  return axios.get(
    `https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/stops/${stopId}`
  );
};
