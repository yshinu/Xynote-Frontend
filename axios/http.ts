import axios, { AxiosRequestConfig } from 'axios';

export const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
    timeout: 5000,
});

// 请求拦截器


instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers['yshinu'] = `${accessToken}`;
        }
        return config;
    },
    (error) => {
        // @ts-ignore
        return Promise.reject(error);
    }
);
