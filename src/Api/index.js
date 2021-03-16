
import { apiUrl } from "../Config";

export const fetcher = (...args) => fetch(...args).then(res => res.json())

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