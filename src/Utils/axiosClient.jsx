// import axios from "axios";
// // import { KEY_ACCESS_TOKEN, getItem, removeItem } from './localStorageManager'
// import {
//     KEY_ACCESS_TOKEN,
//     getItem,
//     removeItem,
//     setItem,
// } from "./localStorageManager";

// export const axiosClient = axios.create({
//     baseURL: "http://localhost:5001",
//     withCredentials: true,
// });

// export const baseURL = "http://localhost:5001";

// // export const axiosClient = axios.create({
// //     baseURL: 'https://medidek-backend-wz4l.onrender.com',
// //     withCredentials: true
// // })

// // export const baseURL = 'https://medidek-backend-wz4l.onrender.com'

// axiosClient.interceptors.request.use((request) => {
//     const accessToken = getItem(KEY_ACCESS_TOKEN);
//     request.headers["Authorization"] = `Bearer ${accessToken}`;
//     return request;
// });

// axiosClient.interceptors.response.use(async (respone) => {
//     const data = respone.data;
//     console.log(data);
//     if (data.status === "ok") {
//         return data;
//     }
//     // if (data.status === "error") {
//     //     return data;
//     // }

//     const orignalRequest = respone.config;
//     console.log(orignalRequest._retry);
//     const statusCode = data.statusCode;
//     console.log(statusCode);
//     const error = data;

//     // When access token is expires

//     if (statusCode === 401 && !orignalRequest._retry) {
//         orignalRequest._retry = true;

//         const response = await axios
//             .create({
//                 withCredentials: true,
//             })
//             .get(`${baseURL}/v2/refresh`);
//         console.log(response.data.result.accessToken);
//         if (response.data.status === "ok") {
//             setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
//             console.log("access token updated");
//             orignalRequest.headers[
//                 "Authorization"
//             ] = `Bearer ${response.data.result.accessToken}`;

//             return axios(orignalRequest);
//         } else {
//             removeItem(KEY_ACCESS_TOKEN);
//             window.location.replace("/master/signin");
//             return Promise.reject(error);
//         }
//     }
//     return Promise.reject(error);
// });

//gpt code

import axios from "axios";
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
    setItem,
} from "./localStorageManager";

// export const axiosClient = axios.create({
//     baseURL: "https://beyondblack.agency",
//     // withCredentials: true,
// });

// export const baseURL = "https://beyondblack.agency";

// export const axiosClient = axios.create({
//     baseURL: "http://localhost:5001",
// // //     // withCredentials: true,
// });

// export const baseURL = "http://localhost:5001";
// export const baseURL = "http://localhost:5001";

export const axiosClient = axios.create({
    baseURL: "https://medidekdemobackend.onrender.com",
    // withCredentials: true
});

export const baseURL = "https://medidekdemobackend.onrender.com";

axiosClient.interceptors.request.use((request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    return request;
});

axiosClient.interceptors.response.use(
    async (respon) => {
        const data = respon.data;
        if (data.status === "ok") {
            return data;
        }
        // console.log(respon.config)
        const originalRequest = respon.config;
        const statusCode = data.statusCode;

        if (statusCode === 401 && data.message === "Invalid access key") {
            // originalRequest._retry = true;

            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace("/");
            // try {
            //     const refreshResponse = await axios.get(`${baseURL}/v2/refresh`, {
            //         withCredentials: true,
            //     });

            //     if (refreshResponse.data.status === "ok") {
            //         setItem(KEY_ACCESS_TOKEN, refreshResponse.data.result.accessToken);
            //         console.log("Access token updated");
            //         originalRequest.headers["Authorization"] = `Bearer ${refreshResponse.data.result.accessToken}`;
            //         return axios(originalRequest);
            //     } else {
            //         removeItem(KEY_ACCESS_TOKEN);
            //         console.error("Access token refresh failed");
            //         window.location.replace("/master/signin");
            //     }
            // } catch (refreshError) {
            //     console.error("Error refreshing access token", refreshError);
            //     removeItem(KEY_ACCESS_TOKEN);
            //     window.location.replace("/master/signin");
            // }
        }

        return Promise.reject(data);
    },
    (error) => {
        console.error("Request error", error);
        return Promise.reject(error);
    }
);
