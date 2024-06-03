import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

 async function findAllCommentLikes(commentId: number) {
  try {
    const commentLikes = await prisma.commentLike.findMany({
      where: { commentId: commentId },
    });
    return commentLikes;
  } catch (error) {
    console.error("Error fetching all comment likes:", error);
    throw error;
  }
}

 async function findCommentLikeById(commentLikeId: number) {
  try {
    const commentLike = await prisma.commentLike.findUnique({
      where: { id: commentLikeId },
    });
    return commentLike;
  } catch (error) {
    console.error("Error fetching comment like by ID:", error);
    throw error;
  }
}

 async function likeComment(userId:number, commentId:number
) {
  try {
    const newCommentLike = await prisma.commentLike.create({
      data: {commentId,userId},
    });
    return newCommentLike;
  } catch (error) {
    console.error("Error liking comment:", error);
    throw error;
  }
}

 async function unlikeComment(commentLikeId: number) {
  try {
    const deletedCommentLike = await prisma.commentLike.delete({
      where: { id: commentLikeId },
    });
    return deletedCommentLike;
  } catch (error) {
    console.error("Error unliking comment:", error);
    throw error;
  }
}

export default {likeComment,unlikeComment,findAllCommentLikes,findCommentLikeById}
