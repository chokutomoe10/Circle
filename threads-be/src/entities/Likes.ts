import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"


@Entity({ name: "likes" })
export class Likes {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.likes)
    user: User

    @ManyToOne(() => Thread, (thread) => thread.likes)
    thread: Thread
}