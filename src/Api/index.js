
export const liveData = [];

const url = "https://flagg.pythonanywhere.com/api";
const parameters = {};

export const fetchLiveData = (emptyData) => {
    return fetch(url, parameters)
        .then(response => {
            return response.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
            //emptyData = data ? JSON.parse(data) : {}
        })
        .catch((error) => {
            console.log(error)
        })

}