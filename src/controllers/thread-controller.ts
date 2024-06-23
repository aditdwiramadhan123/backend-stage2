import { Request, Response } from "express";
import ThreadService from "../services/thread-service";
import { PrismaClient, Prisma } from "@prisma/client";
import { CreateThreadDTO, UpdateThreadDTO } from "../dto/dto-thread";
import calculateDuration from "../services/time-service";
import { redisClient } from "../libs/redis";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

async function findAll(req: Request, res: Response) {
  const username = res.locals.user.username;
  try {
    const threadsService = await ThreadService.findAllThreads();
    const ThreadController = threadsService?.map((thread) => {
      return {
        threadData: {
          name: thread.author.name,
          profilePictureUrl: thread.author.profilePictureUrl,
          username: thread.author.username,
          id: thread.id,
          caption: thread.caption,
          duration: calculateDuration(thread.createdAt),
          imageUrl: thread.imageUrl,
          comments: thread._count.comments,
          likes: thread._count.likes,
          isLike: thread.likes.some((userLike) => {
            return username === userLike.user.username;
          }),
        },
        userLikes: thread.likes,
        userComments: thread.comments,
      };
    });
    // redisClient.set("THREADS_DATA", JSON.stringify(ThreadController));
    res.status(201).json(ThreadController);
  } catch (error) {
    res.status(500).json({ error: "Failed to find threads" });
  }
}

async function findAllByName(req: Request, res: Response) {
  const username = res.locals.user.username;
  const { authorName } = req.params;
  if (!authorName) {
    return res.status(400).json({ error: "Author name parameter is missing" });
  }
  console.log(authorName);

  if (!authorName) {
    return res
      .status(400)
      .json({ error: "Failed to find users: 'name' parameter is required" });
  }

  try {
    const threads = await ThreadService.findAllThreads();

    const threadsByFormat = threads?.map((threadDB) => {
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

    const authorThreads = threadsByFormat.filter((thread) => {
      return thread.threadData.username === authorName;
    });

    res.status(201).json(authorThreads);
  } catch (error) {
    res.status(500).json({ error: "Failed to find threads" });
  }
}

async function findAllMediaByName(req: Request, res: Response) {
  const username = res.locals.user.username;
  const { authorName } = req.params;
  console.log(authorName);

  if (!authorName) {
    return res
      .status(400)
      .json({ error: "Failed to find users: 'name' parameter is required" });
  }

  try {
    const threads = await ThreadService.findAllThreads();

    const Allmedia = threads?.map((threadDB) => {
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

    const authorThreads = Allmedia.filter((media) => {
      return (
        media.threadData.username === authorName && media.threadData.imageUrl
      );
    });

    res.status(201).json(authorThreads);
  } catch (error) {
    res.status(500).json({ error: "Failed to find threads" });
  }
}

async function findOne(req: Request, res: Response) {
  console.log("ini adalah respon findone");
  const username = res.locals.user.username;
  console.log("ini username", username);
  try {
    const { postId } = req.params;
    const threadId = Number(postId);
    const threadDB = await ThreadService.findThreadById(threadId);
    const thread = {
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
    res.status(201).json(thread);
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
    // redisClient.del("THREADS_DATA");
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
    // redisClient.del("THREADS_DATA");
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
    // redisClient.del("THREADS_DATA");
    res.status(201).json(`succsess to delete thread ${threadId}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
}

export default {
  findAll,
  findOne,
  create,
  update,
  deleted,
  findAllByName,
  findAllMediaByName,
};
