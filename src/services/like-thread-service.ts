import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function findAllThreadLikes(threadId: number) {
  try {
    const threadLikes = await prisma.threadLike.findMany({
      where: { threadId: threadId },
    });
    return threadLikes;
  } catch (error) {
    console.error("Error fetching all thread likes:", error);
    throw error;
  }
}

async function findThreadLikeById(threadLikeId: number) {
  try {
    const threadLike = await prisma.threadLike.findUnique({
      where: { id: threadLikeId },
    });
    return threadLike;
  } catch (error) {
    console.error("Error fetching thread like by ID:", error);
    throw error;
  }
}

async function likeThread(threadId: number, userId: number) {
  try {
    const newThreadLike = await prisma.threadLike.create({
      data: { threadId, userId },
    });
    return newThreadLike;
  } catch (error) {
    console.error("Error liking thread:", error);
    throw error;
  }
}

async function unlikeThread(threadLikeId: number) {
  try {
    const deletedThreadLike = await prisma.threadLike.delete({
      where: { id: threadLikeId },
    });
    return deletedThreadLike;
  } catch (error) {
    console.error("Error unliking thread:", error);
    throw error;
  }
}

export default {
  likeThread,
  findAllThreadLikes,
  findThreadLikeById,
  unlikeThread,
};
