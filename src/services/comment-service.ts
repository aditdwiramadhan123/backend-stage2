// DONE

import { PrismaClient, Prisma } from "@prisma/client";
import { CreateCommentDTO,UpdateCommentDTO } from "../dto/dto-comment";
const prisma = new PrismaClient();

 async function findAllComments(threadId:number) {
  try {
    const comments = await prisma.comment.findMany({where:{threadId:threadId}});
    return comments;
  } catch (error) {
    console.error("Error fetching all comments:", error);
    throw error;
  }
}

 async function findCommentById(commentId: number) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    return comment;
  } catch (error) {
    console.error("Error fetching comment by ID:", error);
    throw error;
  }
}

 async function createComment(commentData: CreateCommentDTO) {
  try {
    const newComment = await prisma.comment.create({
      data: commentData,
    });
    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

 async function updateComment(commentId: number, updateData: UpdateCommentDTO) {
  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return null;
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: updateData,
    });

    return updatedComment;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
}

 async function deleteComment(commentId: number) {
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    });
    return deletedComment;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

export default {findAllComments,findCommentById, createComment,updateComment,deleteComment}