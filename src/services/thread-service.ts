// DONE

import { PrismaClient, Prisma } from "@prisma/client";
import { CreateThreadDTO,UpdateThreadDTO } from "../dto/dto-thread";

const prisma = new PrismaClient();

async function findAllThreads() {
  try {
    const threads = await prisma.thread.findMany();
    return threads;
  } catch (error) {
    console.error("Error fetching all threads:", error);
    throw error;
  }
}

async function findThreadById(threadId: number) {
  try {
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
    });
    return thread;
  } catch (error) {
    console.error("Error fetching thread by ID:", error);
    throw error;
  }
}

async function createThread(threadData: CreateThreadDTO) {
  try {
    const newThread = await prisma.thread.create({
      data: threadData,
    });
    return newThread;
  } catch (error) {
    console.error("Error creating thread:", error);
    throw error;
  }
}

async function updateThread(threadData:UpdateThreadDTO,threadId:number) {
  try {
    const existingThread = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!existingThread) {
      return null;
    }

    const updatedThread = await prisma.thread.update({
      where: { id: threadId },
      data: threadData,
    });

    return updatedThread;
  } catch (error) {
    console.error("Error updating thread:", error);
    throw error;
  }
}

async function deleteThread(threadId: number) {
  try {
    const deletedThread = await prisma.thread.delete({
      where: { id: threadId },
    });
    return deletedThread;
  } catch (error) {
    console.error("Error deleting thread:", error);
    throw error;
  }
}

export default {
  findAllThreads,
  findThreadById,
  createThread,
  updateThread,
  deleteThread,
};
