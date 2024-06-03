import { Request, Response } from "express";
import ThreadService from "../services/thread-service";
import { PrismaClient, Prisma } from "@prisma/client";
import { CreateThreadDTO, UpdateThreadDTO } from "../dto/dto-thread";
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
    const {postId} = req.params
    const threadId = Number(postId)
    const threads = await ThreadService.findThreadById(threadId);
    res.status(201).json(threads);
  } catch (error) {
    res.status(500).json({ error: "Failed to find thread" });
  }
}

async function create(req: Request, res: Response) {
  try {
    const data:CreateThreadDTO = req.body;
    if (!data.caption || !data.authorId) {
      return res
        .status(400)
        .json({ error: "Caption and authorId are required" });
    }
    const newThread = await ThreadService.createThread(data);
    res.status(201).json(newThread);
  } catch (error) {
    res.status(500).json({ error: "Failed to create thread" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const data:UpdateThreadDTO = req.body;
    const { postId } = req.params;
    const threadId: number = Number(postId);

    if (!data.caption && !data.imageUrl) {
      return res
        .status(400)
        .json({ error: "Caption or imageUrl are required" });
    }
    const updateThread = await ThreadService.updateThread(
      data,
      threadId
    );
    if (!updateThread) {
      return res.status(404).json({ error: "thread not found" });
    }
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

export default {findAll, findOne, create, update, deleted };
