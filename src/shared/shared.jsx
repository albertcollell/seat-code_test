import axios from "axios";
/* 
const getTrips = () => {
  let trips = [];
  console.log(trips);
  axios
    .get("https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/trips")
    .then(res => {
      console.log(res);
      let test = res.data;
      console.log(test);
      trips.push(test);
      console.log(trips);
      return test;
    });
};
 */

/* const getTrips = () => {
  let trips = [];
  axios
    .get("https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/trips")
    .then(res => {
      console.log(res);
      let test = res.data;
      console.log(test);
      trips.push(...test);
      console.log(trips);
      return trips;
    });
}; */

const getTrips = () => {
  return axios.get(
    "https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/trips"
  );
};

export default getTrips;
