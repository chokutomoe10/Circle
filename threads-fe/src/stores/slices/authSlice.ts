import { IUser } from "../../interfaces/User";
import { createSlice } from '@reduxjs/toolkit'
import { setAuthToken } from "../../lib/api";

const initialAuthState: IUser = {
    id: 0,
    email: "",
    full_name: "",
    profile_description: "",
    profile_picture: "",
    username: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN: (_, action) => {
            const payload = action.payload
            setAuthToken(payload.token)
            console.log("ini data yang ditangkap redux auth login :", payload)
            localStorage.setItem("token", payload.token)

            const user: IUser = {
                id: payload.user.id,
                full_name: payload.user.full_name,
                username: payload.user.username,
                email: payload.user.email,
            };

            return user
        },
        AUTH_CHECK: (_, action) => {
            const payload = action.payload
            console.log("ini data yang ditangkap redux auth check :", payload)

            const user: IUser = {
                id: payload.id,
                full_name: payload.full_name,
                username: payload.username,
                email: payload.email,
            };

            return user
        },
        AUTH_ERROR: () => {
            localStorage.removeItem("token")
        },
        AUTH_LOGOUT: () => {
        }
    }
})