import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const config = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}

const createShortUrl = (url, userId) => {
    const params = new URLSearchParams();
    params.append('originalUrl', url);

    if(userId !== null) {
        params.append('userId', userId);
    }

    return axios.post(`${serverUrl}/createShortUrl`, params, config)
};

const createUser = (userId, email) => {
    const params = new URLSearchParams();
    params.append('userId', userId);
    params.append('email', email);

    return axios.post(`${serverUrl}/createUser`, params, config)
}

const getUserLinks = (userId) => {
    return axios.get(`${serverUrl}/getUserLinks/${userId}`, config);
}

const API = {
    createShortUrl,
    createUser,
    getUserLinks
}

export default API;
