import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const createShortUrl = (url) => {
    const params = new URLSearchParams();
    params.append('originalUrl', url);

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    return axios.post(`${serverUrl}/createShortUrl`, params, config)
};

const API = {
    createShortUrl
}

export default API;
