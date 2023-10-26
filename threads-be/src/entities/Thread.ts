import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Replies } from "./Replies"
import { Likes } from "./Likes"

@Entity({ name: "threads" })
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({nullable: true})
    image: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @Column({nullable: true})
    isLiked: number

    @ManyToOne(() => User, (user) => user.threads)
    user: User

    @OneToMany(() => Replies, (reply) => reply.thread)
    replies: Replies[]

    @OneToMany(() => Likes, (like) => like.thread)
    likes: Likes[]
}
