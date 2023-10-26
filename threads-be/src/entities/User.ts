import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Thread } from "./Thread"
import { Replies } from "./Replies";
import { Follows } from "./Follows";
import { Likes } from "./Likes";

@Entity( {name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    profile_picture: string;
    
    @Column({nullable: true})
    profile_description: string;

    @OneToMany(() => Thread, (thread) => thread.user)
    threads: Thread[]

    @OneToMany(() => Replies, (reply) => reply.user)
    replies: Replies[]

    @OneToMany(() => Follows, (follow) => follow.follower)
    followings: Follows[]

    @OneToMany(() => Follows, (follow) => follow.followed)
    followers: Follows[]

    @OneToMany(() => Likes, (like) => like.user)
    likes: Likes[]
}