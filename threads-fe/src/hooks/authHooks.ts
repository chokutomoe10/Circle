import { IUserLogin, IUserRegister } from "../interfaces/User";
import { useState } from "react";
import { API } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGIN } from "../stores/rootReducer";
import { useDispatch } from "react-redux";


export function useRegister() {
    const [formData, setFormData] = useState<IUserRegister>({
        email: "",
        username: "",
        full_name: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        console.log(name);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleRegister() {
        try {
            const response = await API.post('/auth/register', formData)
            console.log("Register Success", response)
        } catch (error) {
            console.log(error)
        }
    }

    return {handleChange, handleRegister, formData, setFormData}
}

export function useLogin() {
    const Navigate = useNavigate()
    const Dispatch = useDispatch()

    const [formData, setFormData] = useState<IUserLogin>({
        email: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        console.log(name);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleLogin() {
        try {
            const response = await API.post('/auth/login', formData)
            Dispatch(AUTH_LOGIN(response.data))
            Navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    return {handleChange, handleLogin, formData, setFormData}
}