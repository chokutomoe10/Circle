import { IThreadCard } from "./ThreadCard";
import { IUser } from "./User";

export interface IReply {
    id?: number;
    description: string;
    user?: IUser;
    thread?: IThreadCard;
}