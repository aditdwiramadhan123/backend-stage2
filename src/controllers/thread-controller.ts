import { Request, Response } from "express";
import ThreadService from "../services/thread-service";
import { PrismaClient, Prisma } from "@prisma/client";
import { CreateThreadDTO, UpdateThreadDTO } from "../dto/dto-thread";
import { threadId } from "worker_threads";
const prisma = new PrismaClient();

async function findAll(req: Request, res: Response) {
  try {
    const threads = await ThreadService.findAllThreads();
    res.status(201).json(threads);
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
    const userId:number = res.locals.user.id
    const threadData: CreateThreadDTO = {
      ...req.body,
      imageUrl: req.file ? req.file.path : null,
    };
   
    if (!threadData.caption || !userId) {
      return res
        .status(400)
        .json({ error: "Caption and authorId are required" });
    }
    const newThread = await ThreadService.createThread(userId,threadData);
    res.status(201).json(newThread);
  } catch (error) {
    res.status(500).json({ error: "Failed to create thread" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const threadId = Number(postId);
    const userId = res.locals.user.id
    const threadData: CreateThreadDTO = {
      ...req.body,
      imageUrl: req.file ? req.file.path : null,
    };

    if (!threadData.caption || !userId) {
      return res
        .status(400)
        .json({ error: "Caption and authorId are required" });
    }
    console.log (threadId,threadData)
    const updateThread = await ThreadService.updateThread(threadId,threadData);
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
