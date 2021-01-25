
export const liveData = [];
import { apiUrl } from "../Config";

const parameters = {};

export const fetchLiveData = () => {
    return fetch(apiUrl, parameters)
        .then(response => {
            return response.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        })
        .catch((error) => {
            console.log(error)
        })

}