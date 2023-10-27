import { Request, Response } from "express";
import amqp = require ("amqplib")
// import * as amqp from 'amqplib'
import { createThreadSchema } from "../utils/validators/thread"; //

class ThreadQueue {

    async create(req: Request, res: Response) {

        try {
            const queueName = "threads-queue"

            const filename = res.locals.filename
            const data = {
                content: req.body.content,
                image: filename
            }

            const { error } = createThreadSchema.validate(data);

            if (error) {
                return res.status(400).json({
                    error: error, 
                })
            }

            const loginSession = res.locals.loginSession
            console.log(data, loginSession)

            const payload = {
                content: data.content,
                image: data.image,
                user_id : loginSession.user.id
            }
            
            const connection = await amqp.connect('amqp://localhost')
            const channel = await connection.createChannel()

            await channel.assertQueue(queueName)
            
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)))

            await channel.close()
            await connection.close()

            res.status(200).json({
                message: "Thread is queued!"
            })
        } catch (error) {
            console.log("terjadi error ketika melakukan queue:", error)
            res.status(500).json({
                error: "Server error"
            })
        }
    }
}

export default new ThreadQueue