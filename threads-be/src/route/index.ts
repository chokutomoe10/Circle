import express = require ("express")
// import * as express from 'express'
import { Request, Response } from "express"
import ThreadsControllers from '../controllers/ThreadsControllers'
import AuthControllers from '../controllers/AuthControllers'
import authenticate from '../middlewares/auth'
import { upload } from '../middlewares/uploadFile'
// import ThreadsQueue from '../queues/ThreadsQueue'
import LikesControllers from '../controllers/LikesControllers'
import RepliesControllers from '../controllers/RepliesControllers'
import FollowsController from '../controllers/FollowsController'

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
    res.send("Hello from v1!")
})

//thread
router.get("/thread", authenticate, ThreadsControllers.find)
router.get("/thread/:id", authenticate, ThreadsControllers.findOne)
router.post("/thread", authenticate, upload("image"), ThreadsControllers.create)
// router.post("/thread", authenticate, upload("image"), ThreadsQueue.create)
router.get("/thread/delete/:id", ThreadsControllers.delete)
router.patch("/thread/update/:id", ThreadsControllers.update)

//auth
router.post("/auth/register", AuthControllers.register)
router.post("/auth/login", AuthControllers.login)
router.get("/auth/check", authenticate, AuthControllers.check)

//like
router.get("/like", LikesControllers.find)
router.get("/like/:id", LikesControllers.findOne)
router.post("/like", authenticate, LikesControllers.create)

//reply
router.get("/reply", RepliesControllers.find)
router.get("/replies", authenticate, RepliesControllers.findOne)
router.post("/reply/:idThread", authenticate, RepliesControllers.create)

//follow
router.get('/follower', authenticate, FollowsController.findOne)
router.get('/followed', authenticate, FollowsController.findOneUserLogin)
router.post('/follow', authenticate, FollowsController.create)

export default router