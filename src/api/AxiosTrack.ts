
import axios from "axios";
import { loadingTracker } from "./loadingTracker";

export const apiAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiAxios.interceptors.request.use(
    (config) => {
        loadingTracker.start();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiAxios.interceptors.response.use(
    (response) => {
        loadingTracker.finish();
        return response;
    },
    (error) => {
        loadingTracker.finish();
        return Promise.reject(error);
    }
);
