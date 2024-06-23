import { PrismaClient, Prisma } from "@prisma/client";
import replyCommentService from "./reply-comment-service";
import { ReplyCommentType } from "../dto/dto-comment-reply"; 

const prisma = new PrismaClient();

async function findAllCommentReplyLikes(replyCommentId: number) {
  try {
    const commentReplyLikes = await prisma.replyCommentLike.findMany({
      where: { replyCommentId: replyCommentId },
    });
    return commentReplyLikes;
  } catch (error) {
    console.error(
      `Error fetching all comment reply likes: ${replyCommentService}`,
      error
    );
    throw error;
  }
}

async function findCommentReplyLikeById(ReplyCommentLikeId: number) {
  try {
    const commentReplyLike = await prisma.replyCommentLike.findUnique({
      where: { id: ReplyCommentLikeId },
    });
    return commentReplyLike;
  } catch (error) {
    console.error(
      `Error fetching comment reply likes: ${replyCommentService}`,
      error
    );
    throw error;
  }
}

async function likeCommentReply(userId: number, replyCommentId: number) {
  try {
    const newCommentReplyLike = await prisma.replyCommentLike.create({
      data: { userId, replyCommentId },
    });
    return newCommentReplyLike;
  } catch (error) {
    console.error("Error liking comment reply:", error);
    throw error;
  }
}

async function unlikeCommentReply(commentReplyLikeId: number) {
  try {
    const deletedCommentReplyLike = await prisma.replyCommentLike.delete({
      where: { id: commentReplyLikeId },
    });
    return deletedCommentReplyLike;
  } catch (error) {
    console.error("Error unliking comment reply:", error);
    throw error;
  }
}

async function deleteReplyLikeByCommentId(commentId: number) {
  try {
    // Ambil semua reply comments berdasarkan commentId
    const replyComments = await prisma.replyComment.findMany({
      where: { commentId },
      select: { id: true },
    }) as ReplyCommentType[];

    // Ambil semua reply comment IDs
    const replyCommentIds = replyComments.map((reply) => reply.id);

    // Hapus semua likes berdasarkan reply comment IDs
    const deletedLikes = await prisma.replyCommentLike.deleteMany({
      where: {
        replyCommentId: {
          in: replyCommentIds,
        },
      },
    });
  } catch (error) {
    console.error(
      `Error delete all comment reply likes by comment id: ${commentId}`,
      error
    );
    throw error;
  }
}

export default {
  findAllCommentReplyLikes,
  findCommentReplyLikeById,
  likeCommentReply,
  unlikeCommentReply,
  deleteReplyLikeByCommentId,
};
