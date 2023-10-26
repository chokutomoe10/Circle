import { Request, Response } from 'express'
import { Likes } from '../entities/Likes'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'

class LikeService {
    private readonly likeRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

    async find(req: Request, res: Response) {
        try {
            const likes = await this.likeRepository.find({
                relations: ["user", "thread"],
                order: { id: 'DESC' },
            })

            return res.status(200).json(likes)
        } catch (error) {
            return res.status(500).json("Terjadi kesalahan pada server")
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const threadId = parseInt(req.params.id)
    
            const likes = await this.likeRepository.find({
                where: {
                    thread: { id: threadId }
                },
                relations: ["user", "thread"],
            });
    
            return res.status(200).json(likes)
        } catch (error) {
            return res.status(500).json("Terjadi kesalahan pada server")
        }
    }

    async create(req: Request, res:Response) {
        try {
            const loginSession = res.locals.loginSession

            const checkedLike = await this.likeRepository.count({
                where: {
                    user: { id: loginSession.user.id },
                    thread: { id: req.body.thread_id }
                }
            });

            if (checkedLike > 0) {
                const deleteLike = await this.likeRepository.delete({
                    user: { id: loginSession.user.id },
                    thread: { id: req.body.thread_id}
                })

                return res.status(200).json(deleteLike)
            }

            const newLike = this.likeRepository.create({
                user: { id: loginSession.user.id },
                thread: { id: req.body.thread_id }
            });

            const createdLike = await this.likeRepository.save(newLike)
            return res.status(200).json(createdLike)
        } catch (error) {
            console.error(error)
            return res.status(500).json("Terjadi kesalahan pada server")
        }
    }
}

export default new LikeService();