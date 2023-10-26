import { Repository } from "typeorm";
import { Thread } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class ThreadService {
    private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread);

    async find(req: Request, res: Response) {
        try {
        const idUser = res.locals.loginSession.user.id
        const threads = await this.threadRepository.find(
            {
                relations:['user', 'replies', 'likes.user'],
                order: { id: 'DESC' },
            }
        )

        let responseBaru = []

        threads.forEach((element) => {
            responseBaru.push({
                ...element,
                likes_count: element.likes.length,
                replies_count: element.replies.length,
                is_like: element.likes.some((Like: any) =>
                    Like.user && Like.user.id === idUser
                )
            });
        })
        
        return res.status(200).json(responseBaru)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async findOne(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const threads = await this.threadRepository.findOne({
            where : {id : id},
            relations:['user', 'replies', 'likes'],
        })
        return res.status(200).json(threads)
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const deletedThread = await this.threadRepository.delete(id)
        return res.status(200).json(deletedThread)
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id)
        const threads = await this.threadRepository.findOne({
            where : {id : id},
            relations:['user', 'replies', 'likes']
        })
        const data = req.body

        if (data.content != "") {
            threads.content = data.content
        }

        if (data.image != "") {
            threads.image = data.image
        }

        const updatedThread = this.threadRepository.save(threads)

        return res.status(200).json(updatedThread)
    }
}

export default new ThreadService()