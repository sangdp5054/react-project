import axios from "axios";
const ApiAxiosClient = axios.create({
    baseURL: 'http://115.78.1.139:2221',
    timeout: 1000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
// Add a request interceptor
ApiAxiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
ApiAxiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default ApiAxiosClient;