import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const config = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}

const createShortUrl = (url, userId, encryption) => {
    const params = new URLSearchParams();
    params.append('originalUrl', url);

    if(userId !== null) {
        params.append('userId', userId);
    }

    if(encryption !== null) {
        params.append('encryption', JSON.stringify(encryption))
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

const getTotalClickCount = (shortCode) => {
    return axios.get(`${serverUrl}/getTotalClickCount/${shortCode}`, config);
}

const getClickCountByDate = (shortCode) => {
    return axios.get(`${serverUrl}/getClickCountByDate/${shortCode}`, config);
}

const API = {
    createShortUrl,
    createUser,
    getUserLinks,
    getTotalClickCount,
    getClickCountByDate
}

export default API;
