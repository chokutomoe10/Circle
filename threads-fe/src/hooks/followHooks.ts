import { API } from "../lib/api";
import { IFollower, IFollowing } from "../interfaces/Follow";
import { useState, useEffect } from "react";

export function followHook() {

    const [follower, setFollower] = useState<IFollower[]>()
    const [followed, setFollowed] = useState<IFollowing[]>()

    async function getFollowerData() {
        try {
            const response = await API.get('/follower', {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setFollower(response.data)
        } catch (error) {
            console.error('get followerData failed', error);
        }
    }
    
    useEffect(() => {
        getFollowerData();
    },[follower])

    async function getFollowedData() {
        try {
            const response = await API.get('/followed', {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setFollowed(response.data)
        } catch (error) {
            console.error('get followedData failed', error);
        }
    }
    
    useEffect(() => {
        getFollowedData();
    },[followed])

    return {follower, getFollowerData, followed, getFollowedData}
}