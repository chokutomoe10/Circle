import axios from "axios"

export const API = axios.create(
    {
        baseURL: "https://circle-ten.vercel.app/api/v1"
        // baseURL: "http://localhost:5000/api/v1" //ini yg dipakai
        // baseURL: "https://localhost:5000/api/v1"
    }
)

export function setAuthToken(token: string) {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete API.defaults.headers.common["Authorization"]
    }
}