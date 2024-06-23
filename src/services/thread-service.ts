import { PrismaClient, Prisma, Thread, User } from "@prisma/client";
import { CreateThreadDTO, UpdateThreadDTO } from "../dto/dto-thread";
import uploadCloudinary from "../cloudinary-config";
import { MyThreadType, NewThreadType } from "../types/thread-types";
import {Comment, ReplyComment} from "../dto/dto-based-on-schema";

const prisma = new PrismaClient();

async function findAllThreads() {
  try {
    const threads = (await prisma.thread.findMany({
      include: {
        author: {
          select: {
            name: true,
            username: true,
            profilePictureUrl: true,
          },
        },
        comments: {
          select: {
            author: {
              select: {
                name: true,
                username: true,
                profilePictureUrl: true,
              },
            },
          },
        },
        likes: {
          select: {
            user: {
              select: {
                name: true,
                username: true,
                profilePictureUrl: true,
              },
            },
          },
        },
        _count: { select: { comments: true, likes: true } },
      },
      orderBy: {
        createdAt: "desc", // Urutkan berdasarkan waktu pembuatan, descending
      },
    })) as MyThreadType[];

    return threads;
  } catch (error) {
    console.error("Error fetching all threads:", error);
    throw error;
  }
}

async function findThreadById(threadId: number) {
  try {
    const thread = (await prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            profilePictureUrl: true,
          },
        },
        comments: {
          select: {
            author: {
              select: {
                name: true,
                username: true,
                profilePictureUrl: true,
              },
            },
          },
        },
        likes: {
          select: {
            user: {
              select: {
                name: true,
                username: true,
                profilePictureUrl: true,
              },
            },
          },
        },
        _count: { select: { comments: true, likes: true } },
      },
    })) as MyThreadType;

    return thread;
  } catch (error) {
    console.error("Error fetching thread by ID:", error);
    throw error;
  }
}

async function createThread(authorId: number, threadData: CreateThreadDTO) {
  try {
    let uploadImage: { secure_url: string | null } = { secure_url: null };

    if (threadData.imageUrl) {
      try {
        uploadImage = await uploadCloudinary(threadData.imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const newThread = await prisma.thread.create({
      data: {
        ...threadData,
        authorId,
        imageUrl: uploadImage.secure_url,
      },
    });
    return newThread;
  } catch (error) {
    console.error("Error creating thread:", error);
    throw error;
  }
}

async function updateThread(threadId: number, threadData: UpdateThreadDTO) {
  try {
    let uploadImage: { secure_url: string | null } = { secure_url: null };

    if (threadData.imageUrl) {
      try {
        uploadImage = await uploadCloudinary(threadData.imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const existingThread = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!existingThread) {
      return null;
    }

    const updatedThread = await prisma.thread.update({
      where: { id: threadId },
      data: { ...threadData, imageUrl: uploadImage.secure_url },
    });

    return updatedThread;
  } catch (error) {
    console.error("Error updating thread:", error);
    throw error;
  }
}

export const deleteThread = async (threadId: number) => {
  try {
    // Verifikasi apakah thread tersebut ada
    const thread = await prisma.thread.findUnique({
      where: { id: threadId },
      select: { id: true },
    });

    if (!thread) {
      throw new Error('Thread not found');
    }

    // Hapus likes pada thread
    await prisma.threadLike.deleteMany({
      where: { threadId }
    });

    // Cari semua komentar terkait thread
    const comments = await prisma.comment.findMany({
      where: { threadId },
      select: { id: true }
    }) as Comment[];

    if (comments.length > 0) {
      const commentIds = comments.map(comment => comment.id);

      // Hapus likes pada komentar
      await prisma.commentLike.deleteMany({
        where: { commentId: { in: commentIds } }
      });

      // Cari semua balasan komentar terkait komentar
      const replyComments = await prisma.replyComment.findMany({
        where: { commentId: { in: commentIds } },
      }) as ReplyComment[];

      if (replyComments.length > 0) {
        const replyCommentIds = replyComments.map(reply => reply.id);

        // Hapus likes pada balasan komentar
        await prisma.replyCommentLike.deleteMany({
          where: { replyCommentId: { in: replyCommentIds } }
        });

        // Hapus balasan komentar
        await prisma.replyComment.deleteMany({
          where: { id: { in: replyCommentIds } }
        });
      }

      // Hapus komentar
      await prisma.comment.deleteMany({
        where: { id: { in: commentIds } }
      });
    }

    // Hapus thread
    await prisma.thread.delete({
      where: { id: threadId }
    });

    return { message: 'Thread deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting thread: ${error.message}`);
  }
};

export default {
  findAllThreads,
  findThreadById,
  createThread,
  updateThread,
  deleteThread,
};
