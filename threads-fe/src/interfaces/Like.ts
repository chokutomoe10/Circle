import { IUser } from "./User"
import { IThreadCard } from "./ThreadCard";

export interface ILike {
    id: number;
    user: IUser;
    isLike: boolean;
    thread: IThreadCard;
}