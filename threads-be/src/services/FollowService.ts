import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Follows } from "../entities/Follows";
import { User } from "../entities/User";
import { Repository } from "typeorm";

class FollowService {
    private readonly followRepository: Repository<Follows> = AppDataSource.getRepository(Follows);
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

    async findOne(req: Request, res: Response) {
        try {
            const userLoginId = res.locals.loginSession.user.id
            const followers = await this.followRepository.find({
                where: {
                    followed: {
                        id: userLoginId,
                    },
                },
                relations: ['follower'],
                order: { id: 'DESC' }
            });

            const responseBaru = []
            for (const users of followers) {
                const cekIsFollow = await this.followRepository.count({
                    where: {
                        follower: { id: userLoginId },
                        followed: { id: users.follower.id },
                    },
                });
                responseBaru.push({
                    ...users,
                    is_follow: cekIsFollow > 0,
                });
            }
            return res.status(200).json(responseBaru);
        } catch (error) {
            console.error('Error', error);
            return res.status(500).json({ error: 'Server Error'});
        }
    }

    async findOneUserLogin(req: Request, res: Response) {
        try {
            const userId = res.locals.loginSession.user.id
            const followed = await this.followRepository.find({
                where: {
                    follower: { id: userId },
                },
                relations: ['followed'],
                order: { id: 'ASC' }
            });

            const responseBaru = []
            for (const users of followed) {
                responseBaru.push({
                    ...users,
                    is_follow: true,
                });
            }
            return res.status(200).json(responseBaru)
        } catch (error) {
            console.error('Error', error);
            return res.status(500).json({ error: 'Server Error' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession
            const followedUser = await this.userRepository.findOne({
                where: {
                    id: req.body.idUser,
                },
            });

            const checkFollow = await this.followRepository.count({
                where: {
                    followed: { id: followedUser.id },
                    follower: { id: loginSession.user.id },
                },
            });

            if (checkFollow > 0) {
                await this.followRepository.delete({
                    followed: {
                        id: followedUser.id,
                    },
                    follower: {
                        id: loginSession.user.id,
                    },
                });
                return res.status(200).json({ message: 'Unfollow Success' })
            }

            const newFollow = this.followRepository.create({
                followed: followedUser,
                follower: loginSession.user,
            });

            const createdFollow = await this.followRepository.save(newFollow)
            return res.status(200).json({
                message: "Follow Success",
                follow: createdFollow,
            });
        } catch (error) {
            console.error('Error', error);
            return res.status(500).json({ error: "Server Error" });
        }
    }
}

export default new FollowService();