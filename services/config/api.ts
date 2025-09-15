import axios from "axios";

const api = axios.create({
    baseURL:"https://689db599ce755fe69789a2ed.mockapi.io/api/v1",
    timeout: 2000,
})

api.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
});

api.interceptors.response.use(async (config) => {
    return config;
})

export default api;