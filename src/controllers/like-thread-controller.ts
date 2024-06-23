import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import LikeThreadService from "../services/like-thread-service";
import { redisClient } from "../libs/redis";

const prisma = new PrismaClient();

async function createLike(req: Request, res: Response) {
  try {
    const { threadId } = req.params;
    const threadIdNumber = Number(threadId);
    const userIdNumber = res.locals.user.id;

    if (!userIdNumber) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const likedThread = await LikeThreadService.likeThread(
      threadIdNumber,
      userIdNumber
    );
    redisClient.del("THREADS_DATA");
    res.status(200).json(likedThread);
  } catch (error) {
    res.status(500).json({ error: "Failed to like thread" });
  }
}

async function unlikeThread(req: Request, res: Response) {
  try {
    const { threadLikeId } = req.params;
    const threadLikeIdNumber = Number(threadLikeId);

    const unlikedThread = await LikeThreadService.unlikeThread(threadLikeIdNumber);
    res.status(200).json(`succses to unlike thread id = ${threadLikeId}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to unlike thread" });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const { threadId } = req.params;
    const threadIdNumber = Number(threadId);

    const likes = await LikeThreadService.findAllThreadLikes(threadIdNumber);
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get likes for thread" });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const { threadLikeId } = req.params;
    const threadLikeIdNumber = Number(threadLikeId);

    const likes = await LikeThreadService.findThreadLikeById(threadLikeIdNumber);
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get like for thread" });
  }
}

export default { createLike, unlikeThread, findAll, findOne };
