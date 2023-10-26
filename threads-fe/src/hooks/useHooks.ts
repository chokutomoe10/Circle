import { useEffect, useState } from "react";
import { IThreadCard, IThreadPost } from "../interfaces/ThreadCard";
import { API } from "../lib/api";
import { ILike } from "../interfaces/Like";

export function useHook() {

    const[threads, setThreads] = useState<IThreadCard[]>()
    const [likes, setLikes] = useState<ILike[]>()

    const fetchData = async () => {
        try {
            const response = await API.get('/thread', {
                headers : {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            const likeResponse = await API.get('/like')
            setThreads(response.data)
            setLikes(likeResponse.data)
            console.log(response.data)
        }
        catch (error) {
            console.error('error fetching data', error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [likes])

    const [form, setForm] = useState<IThreadPost>(
        {
            content: "",
            image: "",
        }
    )

    const createFetchData = async (event: React.FormEvent) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("content", form.content)
        formData.append("image", form.image as File)

        try {
            const response = await API.post("/thread", formData)
            fetchData()
            console.log(response.data)
        } catch (error) {
            console.log('error upload image', error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        console.log(name);

        if (files) {
            console.log("ini file", files[0])
            setForm({
                ...form,
                [name]: files[0],
            })
        } else {
            console.log("ini value", value)
            setForm({
                ...form,
                [name]: value,
            })
        }
    }

    return {threads, fetchData, setThreads, handleChange, createFetchData, setForm}
}