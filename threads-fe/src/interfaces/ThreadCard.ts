import { IUser } from "./User"
import { ILike } from "./Like"
import { IReply } from "./Reply"

export interface IThreadCard {
    id?: number | string,
    author_picture?: string,
    author_full_name?: string,
    author_username?: string,
    user?: IUser,
    created_at?: string,
    content?: string,
    image?: string,
    likes?: ILike[],
    is_like?: boolean,
    likes_count?: number,
    replies?: IReply[],
    replies_count?: number
}

export interface IThreadPost {
    content: string,
    image?: MediaSource | Blob | string | null
}