import axios from "axios";

const API_KEY=process.env.REACT_APP_API_KEY;

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
})

axios.interceptors.request.use((config) => {
    console.log('requested', config);
    return config;
}, (error) => {
    console.log('request, error', error);
    return Promise.reject(error); 
})

axios.interceptors.response.use((response) => {
    console.log('responded', response);
    return response;
}, (error) => {
    console.log('response, error', error);
    return Promise.reject(error); 
})

export default api;