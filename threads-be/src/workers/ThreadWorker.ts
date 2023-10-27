import amqp = require ("amqplib")
// import * as amqp from 'amqplib'
import { v2 as cloudinary } from 'cloudinary';
import { AppDataSource } from '../data-source';
import { Thread } from '../entities/Thread';

async function processQueue() {

    try {
        const queueName = "threads-queue"
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        cloudinary.config({
            cloud_name: 'dxxzathkv',
            api_key: '366726983258683',
            api_secret: 'xEdX9FlYf-HCQ5_-mIFqiRsJYR4'
        })

        await channel.assertQueue(queueName)

        await channel.consume(queueName, async (message) => {
            if(message !== null) {
                try {
                    const payload = JSON.parse(message.content.toString())

                    console.log("Received message", payload)
            
                    const cloudinaryResponse = await cloudinary.uploader.upload("./uploads/" + payload.image)
        
                    const thread = AppDataSource.getRepository(Thread).create({
                        content: payload.content,
                        image: cloudinaryResponse.secure_url,
                        user: {
                            id: payload.user_id
                        }
                    });      
        
                    await AppDataSource.getRepository(Thread).save(thread)

                    console.log("Thread is created")
                    channel.ack(message)
                } catch (error) {
                    console.log("Queue failed: ", error)
                }
            }
        })
    } catch (error) {
        console.log("Error processing queue:", error)
    }
}

AppDataSource.initialize().then(async () => {
    processQueue()
})