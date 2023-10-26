import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Thread } from "./Thread"

@Entity({ name: "replies" })
export class Replies {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @ManyToOne(() => User, (user) => user.replies)
    user: User

    @ManyToOne(() => Thread, (thread) => thread.replies)
    thread: Thread
}