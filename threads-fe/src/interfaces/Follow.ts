export interface IFollower {
    id: number;
    follower: IFollow;
    is_follow: boolean;
}

export interface IFollowing {
    id: number;
    followed: IFollowed;
    is_follow: boolean;
}

export interface IFollow {
    id: number;
    username: string;
    full_name: string;
    email: string;
    profile_picture: string;
    profile_description: string;
}

export interface IFollowed {
    id: number;
    username: string;
    full_name: string;
    email: string;
    profile_picture: string;
    profile_description: string;
}