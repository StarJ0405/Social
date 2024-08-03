import axios from 'axios';

export function getAPI(){
    const api = axios.create({
        baseURL: 'http://server.starj.kro.kr',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return api;
}