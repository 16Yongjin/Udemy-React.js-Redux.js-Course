import axios from 'axios';

const API_KEY = '35465ff34679c57397115a3b31e675d9';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${API_KEY}`

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},kr`;
    const request = axios.get(url);
    // console.log('Request :', request);

    return {
        type: FETCH_WEATHER,
        payload: request
    }
}