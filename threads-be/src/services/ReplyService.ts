import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Replies } from "../entities/Replies";
import { Thread } from "../entities/Thread";
import { Repository } from "typeorm";

class ReplyService {
    private readonly replyRepository: Repository<Replies> = AppDataSource.getRepository(Replies)
    private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)

    async find(req: Request, res: Response) {
        try {
            const replies = await this.replyRepository.find({
                relations: ["user", "thread"]
            })

            return res.status(200).json(replies)
        } catch (error) {
            return res.status(500).json("Terjadi kesalahan pada server")
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const threadId = parseInt(req.query.threadId as string)

            const replies = await this.replyRepository.find({
                where: {
                    thread: {id: threadId},
                },
                relations: ["user"],
                order: { id: 'ASC' },
            });

            return res.status(200).json(replies)
        } catch (error) {
            console.error(error);
            return res.status(500).json("Terjadi kesalahan pada server")
        }
    }

    async create(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession
            const idThread = parseInt(req.params.idThread)
            const data = req.body;

            const thread = await this.threadRepository.findOne({
                where: {
                    id: idThread
                },
            });
            
            if (!thread) {
                return res.status(400).json({ error: "Thread not found" })
            }

            const newReply = this.replyRepository.create({
                user: { id: loginSession.user.id },
                description: data.description,
                thread: thread,
            })

            const createdReply = await this.replyRepository.save(newReply)
            return res.status(200).json(createdReply)
        } catch (error) {
            console.error(error);
            return res.status(500).json("Terjadi kesalahan pada server")
        }
    }
}

export default new ReplyService();