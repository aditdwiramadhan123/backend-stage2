import { PrismaClient, Prisma } from "@prisma/client";
import { CreateCommentDTO, UpdateCommentDTO } from "../dto/dto-comment";
import uploadCloudinary from "../cloudinary-config";

const prisma = new PrismaClient();

async function findAllComments(threadId: number) {
  try {
    const comments = await prisma.comment.findMany({
      where: { threadId },
    });
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
    let uploadImage: { secure_url: string | null } = { secure_url: null };

    if (commentData.imageUrl) {
      try {
        uploadImage = await uploadCloudinary(commentData.imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const newComment = await prisma.comment.create({
      data: {
        ...commentData,
        imageUrl: uploadImage.secure_url,
      },
    });
    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

async function updateComment(commentId: number, updateData: UpdateCommentDTO) {
  try {
    let uploadImage: { secure_url: string | null } = { secure_url: null };

    if (updateData.imageUrl) {
      try {
        uploadImage = await uploadCloudinary(updateData.imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return null;
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { ...updateData, imageUrl: uploadImage.secure_url },
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

export default {
  findAllComments,
  findCommentById,
  createComment,
  updateComment,
  deleteComment,
};
