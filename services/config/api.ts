import axios from "axios";

const api = axios.create({
    baseURL:process.env.EXPO_BASE_API_URI,
    timeout: 1000,
})

api.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
});

api.interceptors.response.use(async (config) => {
    return config;
})

export default api;