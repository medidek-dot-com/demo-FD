import { commonRequest } from "./CommonApi";
import {BACKEND_URL} from "./Helper"

export const registerApi = async(data, header)=>{
    return await commonRequest("POST", `${BACKEND_URL}/registerUser`, data, header);
}

// export const getUsersApi = async(search,gender, status, sort, page)=>{
//     return await commonRequest("GET", `${BACKEND_URL}/users?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, "");
// }

// export const singleUserApi = async(id)=>{
//     return await commonRequest("GET", `${BACKEND_URL}/user/${id}`, "")
// }

// export const updateUserApi = async(id, data, header)=>{
//     return await commonRequest("PUT", `${BACKEND_URL}/update-user/${id}`, data, header )
// }

// export const deleteUserApi = async(id)=>{
//     return await commonRequest("DELETE", `${BACKEND_URL}/delete-user/${id}`, {})
// }

// export const statusChangeApi = async(id, data)=>{
//     return await commonRequest("PUT", `${BACKEND_URL}/update-user-status/${id}`, {data})
// }

// export const exportToCsvApi = async()=>{
//     return await commonRequest("GET", `${BACKEND_URL}/export-users`, "")
// }