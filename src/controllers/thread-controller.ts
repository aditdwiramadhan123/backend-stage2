import { Request, Response } from "express";
import ThreadService from "../services/thread-service";
import { PrismaClient, Prisma } from "@prisma/client";
import { CreateThreadDTO, UpdateThreadDTO } from "../dto/dto-thread";
import { threadId } from "worker_threads";
import calculateDuration from "../services/time-service";

const prisma = new PrismaClient();

async function findAll(req: Request, res: Response) {
  const username = res.locals.user.username;
  try {
    const threads = await ThreadService.findAllThreads();

    const myThreads = threads?.map((threadDB) => {
      return {
        threadData: {
          name: threadDB.author.name,
          profilePictureUrl: threadDB.author.profilePictureUrl,
          username: threadDB.author.username,
          id: threadDB.id,
          caption: threadDB.caption,
          duration: calculateDuration(threadDB.createdAt),
          imageUrl: threadDB.imageUrl,
          comments: threadDB._count.comments,
          likes: threadDB._count.likes,
          isLike: threadDB.likes.some((userLike) => {
            return username === userLike.user.username;
          }),
        },
        userLikes: threadDB.likes,
        userComments: threadDB.comments,
      };
    });
    res.status(201).json(myThreads);
  } catch (error) {
    res.status(500).json({ error: "Failed to find threads" });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const threadId = Number(postId);
    const threads = await ThreadService.findThreadById(threadId);
    res.status(201).json(threads);
  } catch (error) {
    res.status(500).json({ error: "Failed to find thread" });
  }
}

async function create(req: Request, res: Response) {
  try {
    const userId: number = res.locals.user.id;
    const threadData: CreateThreadDTO = {
      ...req.body,
      imageUrl: req.file ? req.file.path : null,
    };

    if (!threadData.caption || !userId) {
      return res
        .status(400)
        .json({ error: "Caption and authorId are required" });
    }
    const newThread = await ThreadService.createThread(userId, threadData);
    res.status(201).json(newThread);
  } catch (error) {
    res.status(500).json({ error: "Failed to create thread" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const threadId = Number(postId);
    const userId = res.locals.user.id;
    const threadData: CreateThreadDTO = {
      ...req.body,
      imageUrl: req.file ? req.file.path : null,
    };

    if (!threadData.caption || !userId) {
      return res
        .status(400)
        .json({ error: "Caption and authorId are required" });
    }
    console.log(threadId, threadData);
    const updateThread = await ThreadService.updateThread(threadId, threadData);
    res.status(201).json(updateThread);
  } catch (error) {
    res.status(500).json({ error: "Failed to update thread" });
  }
}

async function deleted(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const threadId = Number(postId);
    const deleteThread = await ThreadService.deleteThread(threadId);
    res.status(201).json(`succsess to delete thread ${threadId}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
}

export default { findAll, findOne, create, update, deleted };
