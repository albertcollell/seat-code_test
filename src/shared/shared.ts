import axios from "axios";

export const getData = () => {
    const url: string = "https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/trips";
    axios
        .get(url)
    .then(response => {
        return response.data
    })
    .error(error => {
        return error
    })
}

