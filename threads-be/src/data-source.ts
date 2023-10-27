import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Thread } from "./entities/Thread"
import { Replies } from "./entities/Replies"
import { Likes } from "./entities/Likes"
import { Follows } from "./entities/Follows"

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "pgsql089",
//     database: "threads-be",
//     synchronize: true,
//     logging: false,
//     entities: ["src/entities/*.ts"],
//     migrations: ["src/migrations/*.ts"],
//     subscribers: [],
// })

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "roundhouse.proxy.rlwy.net",
    port: 50125,
    username: "postgres",
    password: "BF35fgf6gCADaGD4-c31a2c4*1c3aDD*",
    database: "railway",
    synchronize: true,
    logging: false,
    entities: [User, Thread, Replies, Likes, Follows],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
})
