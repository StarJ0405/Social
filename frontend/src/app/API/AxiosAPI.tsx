import axios from 'axios';

export function getAPI() {
    const api = axios.create({
        baseURL: 'http://localhost:8080',
        // baseURL: 'http://server.starj.kro.kr:18182',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
            Pragma: 'no-store',
            Expires: '0',
        },
    });
    return api;
}